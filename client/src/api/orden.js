import axios from "./axios";

export const createOrden = async (orden) => axios.post("/api/orden/new", orden);

export const getAllOrdenes = async ( params = {}) => axios.get("/api/orden/get", { params });

export const getOrdenById = async (id) => axios.get(`/api/orden/get/${id}`);

export const updateOrden = async (id, orden) => axios.put(`/api/orden/update/${id}`, orden);

export const deleteOrden = async (id) => axios.delete(`/api/orden/delete/${id}`);
