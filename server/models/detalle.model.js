import mongoose from "mongoose";
import Orden from "./orden.model.js";
import Servicio from "./servicio.model.js";

const DetalleOrdenSchema = new mongoose.Schema(
    {
        orden: [{ 
            type: mongoose.Schema.Types.ObjectId, ref: Orden
        }],
        servicios: [{ 
            type: mongoose.Schema.Types.ObjectId, ref: Servicio
        }],
        valorServicio:[{ 
            type: mongoose.Schema.Types.valor_servicio, ref: Servicio
            }],
    },
    { timestamps: true }
);

const DetalleOrden = mongoose.model("DetalleOrden", DetalleOrdenSchema);

export default DetalleOrden;
