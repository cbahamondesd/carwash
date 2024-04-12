import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema(
    {
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
                validator: val => /^\d{9}$/.test(val),
                message: "Por favor ingresa un número de teléfono válido"
            }
        },
        vehiculos: {
                type: Number,
                required: [true, "El número de vehículos es requerido."],
                min: 0
        },
        id_orden: {
                type: Number,
                unique: true
        }
        
    },
    { timestamps: true }
);

const Cliente = mongoose.model("cliente", ClienteSchema);

export default Cliente;