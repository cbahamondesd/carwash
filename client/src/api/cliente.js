import axios from "./axios";

export const registrarCliente = cliente => axios.post("/api/cliente", cliente);

export const getAllClientes = () => axios.get("/api/cliente");

export const getClienteById = id => axios.get(`/api/cliente/${id}`);

export const updateCliente = (id, updatedCliente) => axios.put(`/api/cliente/${id}`, updatedCliente);

export const deleteCliente = id => axios.delete(`/api/cliente/${id}`);