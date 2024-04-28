import axios from "./axios";

export const createOrden = async (orden) => axios.post("http://localhost:8000/api/orden/new", orden);

export const getAllOrdenes = async () => axios.get("http://localhost:8000/api/orden/get");

export const getOrdenById = async (id) => axios.get(`http://localhost:8000/api/orden/get/${id}`);

export const updateOrden = async (orden) => axios.put(`http://localhost:8000/api/orden/update/${id}`, orden);

export const deleteOrden = async (id) => axios.delete(`http://localhost:8000/api/orden/delete/${id}`);
