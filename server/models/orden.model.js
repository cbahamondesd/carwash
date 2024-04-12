import mongoose from "mongoose";
import Cliente from "./cliente.model.js";
import Servicio from "./servicio.model.js";

const OrdenSchema = new mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: [true, "La fecha es requerida"]
    },
    mtoTotal: {
      type: Number,
      default: 0
    },
    cliente: [{ 
      type: mongoose.Schema.Types.ObjectId, ref: Cliente
    }],
    servicios: [{ 
      type: mongoose.Schema.Types.ObjectId, ref: Servicio
    }]
  },
  { timestamps: true }
);
/*
OrdenSchema.pre('save', async function(next) {
  try {
    // Ensure servicios and cliente fields are populated
    await this.populate('servicios').execPopulate();
    await this.populate('cliente').execPopulate();
    
    // Calculate the sum of valor_servicio
    const total = this.servicios.reduce((acc, servicio) => acc + servicio.valor_servicio, 0);
    
    // Assign the calculated total to mtoTotal
    this.mtoTotal = total;
    
    // Proceed to the next middleware
    next();
  } catch (error) {
    next(error);
  }
}); 
*/

const Orden = mongoose.model("orden", OrdenSchema);

export default Orden;
