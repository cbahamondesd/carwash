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
        vehiculos: [
            {
                patente: {
                    type: String,
                    required: [true, "La patente es requerida."]
                },
                tipoVehiculo: {
                    type: String,
                    required: [true, "El tipo de vehículo es requerido."]
                }
            }
        ],
        creadoPor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "funcionario",
            required: [true, "El cliente debe ser asociado a un funcionario."]
        },
        id_orden: {
                type: Number,
                unique: true,
                sparse: true
        }
        
    },
    { timestamps: true }
);

const Cliente = mongoose.model("cliente", ClienteSchema);

export default Cliente;