import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: [true, "El nombre del cliente es requerido."]
        },
        email: {
            type: String,
            required: [true, "El correo electrónico es requerido."],
            unique: true,
            lowercase: true,
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Por favor, ingrese un correo electrónico válido."
            }
        },
        celular: {
            type: Number,
            required: [true, "El número de teléfono es requerido."],
            unique: true,
            validate: {
                validator: val => /^\d{4}-\d{4}$/.test(val),
                message: "Por favor, ingrese un número de teléfono válido."
            },
            vehiculos: {
                type: Number,
                required: [true, "El número de vehículos es requerido."],
                min: 0
            },
            id_orden: {
                type: Number,
                required: true,
                unique: true
            }
        },

    },
    { timestamps: true }
);

const Cliente = mongoose.model("cliente", ClienteSchema);

export default Cliente;