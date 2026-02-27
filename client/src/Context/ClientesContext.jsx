import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import {
    registrarCliente as registrarClienteRequest,
    getAllClientes as getAllClientesRequest,
    getClienteById as getClienteByIdRequest,
    updateCliente as updateClienteRequest,
    deleteCliente as deleteClienteRequest,
} from "../api/cliente.js";

const ClientesContext = createContext();

export const useClientes = () => {
    const context = useContext(ClientesContext);
    if (!context) {
        throw new Error("useClientes must be used within a ClientesProvider");
    }
    return context;
};

export function ClientesProvider({ children }) {
    const [clientes, setClientes] = useState([]);

    const registrarCliente = async (cliente) => {
        try {
            await registrarClienteRequest(cliente);
            await getAllClientes();
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error: error.response?.data?.message || "Error al registrar el cliente" };
        }
    };

    const getAllClientes = async () => {
        try {
            const res = await getAllClientesRequest();
            setClientes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getClienteById = async (id) => {
        try {
            const res = await getClienteByIdRequest(id);
            if (res.status === 200) {
                const fetchedCliente = res.data;
                setClientes(prev =>
                    prev.map(c => c._id === id ? fetchedCliente : c)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateCliente = async (updatedCliente) => {
        try {
            const res = await updateClienteRequest(updatedCliente._id, updatedCliente);
            if (res.status === 200) {
                setClientes(prev =>
                    prev.map(c => c._id === updatedCliente._id ? updatedCliente : c)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteCliente = async (id) => {
        try {
            const res = await deleteClienteRequest(id);
            if (res.status === 200) {
                setClientes(prev => prev.filter(c => c._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ClientesContext.Provider 
            value={{ 
                clientes, 
                registrarCliente, 
                getAllClientes, 
                getClienteById, 
                updateCliente, 
                deleteCliente 
            }}>
            {children}
        </ClientesContext.Provider>
    );
}

ClientesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};