import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import {
    createServicio as createServicioRequest,
    getAllServicios as getAllServiciosRequest,
    getServicioById as getServicioByIdRequest,
    updateServicio as updateServicioRequest,
    deleteServicio as deleteServicioRequest,
} from "../api/servicio.js";

const ServiciosContext = createContext();

export const useServicios = () => {
    const context = useContext(ServiciosContext);
    if (!context) {
        throw new Error("useServicios must be used within a ServiciosProvider");
    }
    return context;
};

export function ServiciosProvider({ children }) {
    const [servicios, setServicios] = useState([]);

    const createServicio = async (servicio) => {
        try {
            const res = await createServicioRequest(servicio);
            console.log(res);
            await getAllServicios();
        } catch (error) {
            console.error(error);
        }
    };

    const getAllServicios = async () => {
        try {
            const res = await getAllServiciosRequest();
            setServicios(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getServicioById = async (id) => {
        try {
            const res = await getServicioByIdRequest(id);
            if (res.status === 200) {
                const fetchedServicio = res.data;
                setServicios(prev =>
                    prev.map(s => s._id === id ? fetchedServicio : s)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateServicio = async (updatedServicio) => {
        try {
            const res = await updateServicioRequest(updatedServicio._id, updatedServicio);
            if (res.status === 200) {
                setServicios(prev =>
                    prev.map(s => s._id === updatedServicio._id ? updatedServicio : s)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteServicio = async (id) => {
        try {
            const res = await deleteServicioRequest(id);
            if (res.status === 200) setServicios(servicios.filter(s => s._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ServiciosContext.Provider
            value={{
                servicios,
                createServicio,
                getAllServicios,
                getServicioById,
                updateServicio,
                deleteServicio,
            }}
        >
            {children}
        </ServiciosContext.Provider>
    );
}

ServiciosProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
