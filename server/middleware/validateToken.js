import jwt from "jsonwebtoken"; // Importando la librería jsonwebtoken para verificar el token

import { TOKEN_SECRET } from "../config/config.js"; // Importando la clave secreta para verificar el token

export const authRequired = (req, res, next) => {

    const { token } = req.cookies; // Obteniendo el token de las cookies

    if (!token)
        return res.status(401).json({ message: "No hay token: no autorizado" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err)
        return res.status(401).json({ message: "Token no válido" }); 

        req.user = user; // Si el token es válido, guardar el usuario en el objeto req
        next(); // Pasar al siguiente middleware
    });
};