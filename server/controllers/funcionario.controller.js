import Funcionario from "../models/funcionario.model.js";

//CREATE
const createFuncionario = async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        let newData = await Funcionario.create(data);
        console.log(newData);
        res.status(200).json(newData);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
        message: "Por favor completa los campos requeridos.",
        });
    }
};

// GET ALL
const getAllFuncionarios = async (req, res) => {
    try {
        let list = await Funcionario.find().sort({ funcionarioType: 1 }).exec();
        res.status(200).json(list);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
        message: error.message,
        });
    }
};

// GET BY ID
const getFuncionarioById = async (req, res) => {
    try {
        let id = req.params.id;
        let found = await Funcionario.findById(id);
        res.status(200).json(found);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
        message: error.message,
        });
    }
};

//UPDATE
const updateFuncionario = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        await Funcionario.findByIdAndUpdate(id, data, { runValidators: true });
        res.status(200).json();
    } catch (error) {
        console.log("Error" + error);
        res.status(400).json({
        message: error.message,
        });
    }
};

//DELETE
const deleteFuncionario = async (req, res) => {
    try {
        let id = req.params.id;
        await Funcionario.findByIdAndDelete(id);
        res.status(200).json();
    } catch (error) {
        console.log("Error" + error);
        res.status(400).json({
        error: "No hemos podido eliminar a este funcionario(a) de la base de datos. Por favor inténtalo de nuevo.",});
    }
};

export { createFuncionario, getAllFuncionarios, getFuncionarioById, updateFuncionario, deleteFuncionario };
