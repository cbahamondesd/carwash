import z from "zod"; // Importamoms zod para validar los datos

export const registerSchema = z.object({

    firstName: z
        .string({
        message: "El nombre es requerido",
        })
        .min(3, {
        message: "El nombre debe tener al menos 3 caracteres",
        }), 

        apellido: z
        .string({
        message: "El apellido es requerido",
        })
        .min(3, {
        message: "El apellido debe tener al menos 3 caracteres",
        }), 


    email: z
        .string({
        message: "El email es rquerido",
        })
        .email({
        message: "Email no válido",
        }),


    
    password: z
        .string({
        message: "La contraseña es obligatoria",
        })
        .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
        }), 
});

export const loginSchema = z.object({
    email: z 
        .string({
        message: "Email es requerido",
        })
        .email({
        message: "Email es inválido",
        }),
    password: z
        .string({
        message: "Password es requerido",
        })
        .min(6,{
        message: "La contraseña debe tener al menos 6 caracteres",
        
        })
});
