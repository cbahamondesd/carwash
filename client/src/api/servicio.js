import axios from "./axios";

export const createServicio = async (servicio) => axios.post("http://localhost:8000/servicio", servicio);

export const getAllServicios = async () => axios.get("http://localhost:8000/servicio");

export const getServicioById = async (id) => axios.get(`http://localhost:8000/servicio/${id}`);

export const updateServicio = async (servicio) => axios.put(`http://localhost:8000/servicio/${id}`, servicio);

export const deleteServicio = async (id) => axios.delete(`http://localhost:8000/servicio/${id}`);
