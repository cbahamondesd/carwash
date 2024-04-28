import mongoose from "mongoose";

const FuncionarioSchema = new mongoose.Schema(
    {
        nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
        },
        apellido: {
            type: String,
            required: [true, "El apellido es requerido"],
        },
        email: {
            type: String,
            required: [true, "El correo electrónico es requerido"],
            unique: true, // Asegura que el correo electrónico sea único
            lowercase: true,
            trim: true,
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Por favor ingresa un correo electrónico válido"
            }
        },
        password: {
            type: String,
            required: [true, "La contraseña es requerida"],
        },
    },
    { timestamps: true }
);

const Funcionario = mongoose.model("funcionario", FuncionarioSchema);

export default Funcionario;
