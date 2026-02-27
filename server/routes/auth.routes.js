import { Router } from "express";
import {
    login,
    logout,
    profile,
    register,
    verifyToken,
    getAllFuncionarios,
    getFuncionarioById
} from "../controllers/auth.controller.js"; 

import { authRequired } from "../middleware/validateToken.js";

import { validateSchema } from "../middleware/validator.middleware.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";


const router = Router();

router.post( 

    "/register", 
    validateSchema(registerSchema), 
    register);

router.post("/login", validateSchema(loginSchema), login); 

router.post("/logout", logout); 

router.get("/profile", authRequired, profile);

router.get("/verify", verifyToken); 

router.get("/funcionarios", getAllFuncionarios); 

router.get("/funcionarios/:id", getFuncionarioById); 

export { router }; 
