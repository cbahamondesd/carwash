const mongoose = require('mongoose');

const ServicioSchema = new mongoose.Schema(
    {
        descripcion: {
            type: String,
            required: [true, "La descripción del servicio es requerida"],
            trim: true, //Para que no se guarden espacios en blanco
            unique: true 
        },
        valor: {
            type: Number,
            min : [1000, "El valor minimo del servicio no puede ser inferior a 1.000"], 
            max : [500000, "El valor maximo del servicio no puede superar los 500.000"]
        }
    },
    { timestamps: true }
);

const Servicio = mongoose.model("servicio", ServicioSchema);

module.exports = Servicio
