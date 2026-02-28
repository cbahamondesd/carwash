import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    createOrden as createOrdenRequest,
    getAllOrdenes as getAllOrdenesRequest,
    getOrdenById as getOrdenByIdRequest,
    updateOrden as updateOrdenRequest,
    deleteOrden as deleteOrdenRequest,
} from "../api/orden.js";

const OrdenesContext = createContext();

export const useOrdenes = () => {
    const context = useContext(OrdenesContext);
    if (!context) {
        throw new Error("useOrdenes must be used within a OrdenesProvider");
    }
    return context;
};

export function OrdenesProvider({ children }) {
    const [ordenes, setOrdenes] = useState([]);

    const createOrden = async (orden) => {
        try {
            await createOrdenRequest(orden);
            await getAllOrdenesRequest();
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error: error.response?.data?.message || "Error al crear la orden" };
        }
    };

    const getAllOrdenes = async () => {
        try {
            const res = await getAllOrdenesRequest();
            setOrdenes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getOrdenById = async (id) => {
        try {
            const res = await getOrdenByIdRequest(id);
            if (res.status === 200) {
                const fetchedOrden = res.data;
                setOrdenes(prev =>
                    prev.map(o => o._id === id ? fetchedOrden : o)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateOrden = async (updatedOrden) => {
        try {
            await updateOrdenRequest(updatedOrden);
            await getAllOrdenesRequest();
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error: error.response?.data?.message || "Error al actualizar la orden" };
        }
    };

    const deleteOrden = async (id) => {
        try {
            await deleteOrdenRequest(id);
            setOrdenes(prev => prev.filter(o => o._id !== id));
            console.log(`Orden con ID ${id} eliminada correctamente`);
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error: error.response?.data?.message || "Error al eliminar la orden" };
        }
    };

    return (
        <OrdenesContext.Provider value={{ ordenes, createOrden, getAllOrdenes, getOrdenById, updateOrden, deleteOrden }}>
            {children}
        </OrdenesContext.Provider>
    );
}

OrdenesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};