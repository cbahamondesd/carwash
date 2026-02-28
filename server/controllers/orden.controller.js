import Orden from "../models/orden.model.js";

const createOrden = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    let newData = await Orden.create(data);
    console.log(newData);
    res.status(200).json(newData);
  } catch (error) {
    console.log("Error" + error.message);
    res.status(400).json({
      message: "Por favor completa los campos requeridos.",
    });
  }
};

const getAllOrdenes = async (req, res) => {
  try {
    const { funcionarioId } = req.query;
    const filter = funcionarioId ? { funcionario: funcionarioId } : {};

    let list = await Orden.find(filter)
      .populate("cliente", "nombre")
      .populate("funcionario", "nombre apellido")
      .populate("servicio", "descripcion valor_servicio")
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(list);
  } catch (error) {
    console.log("Error" + error.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getOrdenById = async (req, res) => {
  try {
    let id = req.params.id;
    let found = await Orden.findById(id);
    res.status(200).json(found);
  } catch (error) {
    console.log("Error" + error.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateOrden = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    await Orden.findByIdAndUpdate(id, data, { runValidators: true });
    res.status(200).json();
  } catch (error) {
    console.log("Error" + error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteOrden = async (req, res) => {
  try {
    let id = req.params.id;
    await Orden.findByIdAndDelete(id);
    res.status(200).json();
  } catch (error) {
    console.log("Error" + error);
    res.status(400).json({
      error: "No hemos podido cancelar tu orden. Por favor inténtalo de nuevo.",});
  }
};

export { createOrden, getAllOrdenes, getOrdenById, updateOrden, deleteOrden };
