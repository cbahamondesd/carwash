import axios from "./axios";

export const createServicio = async (servicio) => axios.post("/api/servicio", servicio);

export const getAllServicios = async () => axios.get("/api/servicio");

export const getServicioById = async (id) => axios.get(`/api/servicio/${id}`);

export const updateServicio = async (id, servicio) => axios.put(`/api/servicio/${id}`, servicio);

export const deleteServicio = async (id) => axios.delete(`/api/servicio/${id}`);
