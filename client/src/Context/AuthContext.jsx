import { createContext, useState, useContext, useEffect } from "react";
import {
    registerRequest,
    loginRequest,
    verifyTokenRequet,
    getFuncionarioByIdRequest
} from "../api/auth.js";

import Cookies from "js-cookie";
export const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
    }
    return context;
    };

export const AuthProvider = ({ children }) => {
    const [funcionario, setFuncionario] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (funcionario) => {
        try {
        const res = await registerRequest(funcionario);
        console.log(res.data);
        setFuncionario(res.data);
        setIsAuthenticated(true);
        } catch (error) {
        // console.log(error.response);
        setErrors(error.response.data);
        }
    };

    const signin = async (funcionario) => {
        try {
        const res = await loginRequest(funcionario);
        console.log(res);
        setFuncionario(res.data);
        setIsAuthenticated(true);
        } catch (error) {
        setErrors(error.response.data);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setFuncionario(null);
        setIsAuthenticated(false);
    };

    const getFuncionarioById = async (funcionarioId) => {
        try {
        const res = await getFuncionarioByIdRequest(funcionarioId);
        return res.data;
        } catch (error) {
        console.error("Error fetching funcionario by ID:", error);
        return null;
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
        const timer = setTimeout(() => {
            setErrors([]);
        }, 2500);
        return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
        const cookies = Cookies.get();

        if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return setFuncionario(null);
        }

        try {
            const res = await verifyTokenRequet(cookies.token);
            if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false);

            return;
            }
            setIsAuthenticated(true);
            setFuncionario(res.data);
            setLoading(false);
        } catch (error) {
            setIsAuthenticated(false);
            setFuncionario(null);
            setLoading(false);
        }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
        value={{
            signup,
            signin,
            loading,
            funcionario,
            isAuthenticated,
            errors,
            logout,
            getFuncionarioByIdRequest: getFuncionarioById
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};
