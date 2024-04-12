import mongoose from "mongoose";

const FuncionarioSchema = new mongoose.Schema(
    {
        nombreFuncionario: {
        type: String,
        required: [true, "El nombre es requerido"],
        },
        telefono: {
            type: String,
            required: [true, "El teléfono es requerido"],
            unique: true, 
            validate: {
                validator: val => /^\d{9}$/.test(val),
                message: "Por favor ingresa un número de teléfono válido"
            }
        },
        email: {
            type: String,
            required: [true, "El correo electrónico es requerido"],
            unique: true, // Asegura que el correo electrónico sea único
            lowercase: true,  
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Por favor ingresa un correo electrónico válido"
            }
        }
    },
    { timestamps: true }
);

const Funcionario = mongoose.model("funcionario", FuncionarioSchema);

export default Funcionario;
