import Funcionario from "../models/funcionario.model.js"; 

import bcrypt from "bcryptjs"; 
import { createAccessToken } from "../libs/jwt.js"; 
import jwt from "jsonwebtoken"; 
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {

    const { nombre, apellido, email, password } = req.body;

    try {
        const funcionarioFound = await Funcionario.findOne({ email });

        if (funcionarioFound)
        return res.status(400).json(["Este correo ya existe"]);

        const passwordHash = await bcrypt.hash(password, 10);

        const newFuncionario = new Funcionario({

        nombre,
        apellido,
        email,
        password: passwordHash,
        });

        const funcionarioSaved = await newFuncionario.save();

        const token = await createAccessToken({ id: funcionarioSaved._id }); //Crear token


        res.cookie("token", token); // Guardar el token en las cookies


        res.json({
        //Para no mostrar el password
        //Parametros que se van a mostrar en el front
        _id: funcionarioSaved._id,
        nombre: funcionarioSaved.nombre,
        apellido: funcionarioSaved.apellido,
        email: funcionarioSaved.email,
        createdAt: funcionarioSaved.createdAt,
        updatedAt: funcionarioSaved.updatedAt,
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const funcionarioFound = await Funcionario.findOne({ email }); 
        const isMatch = await bcrypt.compare(password, funcionarioFound.password); 
        if (!funcionarioFound && !isMatch)
        return res.status(400).json(["Funcionario o contraseña incorrecta"]);

        const token = await createAccessToken({ id: funcionarioFound._id }); // Crear token
        res.cookie("token", token); // Guardar el token en las cookies
        res.json({
        // Responder con un estado 200 y los siguientes datos
        //Para no mostrar el password
        // Parametros que se van a mostrar en el front
        _id: funcionarioFound._id,
        nombre: funcionarioFound.nombre,
        apellido: funcionarioFound.apellido,
        email: funcionarioFound.email,
        createdAt: funcionarioFound.createdAt,
        updatedAt: funcionarioFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {

    res.cookie("token", "", {
        // Limpiar las cookies
        expires: new Date(0), // Fecha de expiración
    });

    res.send("Haz cerrado sesión y limpiado cookies."); 
    return res.sendStatus(204);
};

export const profile = async (req, res) => {

    const funcionarioFound = await Funcionario.findById(req.funcionario.id);
    
    if (!funcionarioFound)
        return res.status(400).json({ message: "Funcionario no encontrado" }); 

    return res.json({
        // Responder con un estado 200 y los siguientes datos
        // Parametros que se van a mostrar en el front
        id: funcionarioFound._id,
        nombre: funcionarioFound.nombre,
        apellido: funcionarioFound.apellido,
        email: funcionarioFound.email,
        createdAt: funcionarioFound.createdAt,
        updatedAt: funcionarioFound.updatedAt,
    });
};


export const verifyToken = async (req, res) => { 
    const {token} = req.cookies; 

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (err, funcionario) => { 
        if (err) return res.status(401).json({ message: "Unauthorized" }); 

        const funcionarioFound = await Funcionario.findById(funcionario.id); 
        if (!funcionarioFound) 
        return res.status(400).json({ message: "Unauthorized" }); 

        return res.json({ 
        id: funcionarioFound._id,
        nombre: funcionarioFound.nombre,
        apellido: funcionarioFound.apellido,
        email: funcionarioFound.email,
        });
    }); 
}

export const getAllFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        console.log(funcionarios);
        res.status(200).json(funcionarios);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
        message: error.message,
        });
    }
}

export const getFuncionarioById = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

