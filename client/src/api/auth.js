import axios from "./axios";


export const registerRequest = funcionario => axios.post(`/register`, funcionario)

export const loginRequest = funcionario => axios.post(`/login`, funcionario)

export const verifyTokenRequet = () => axios.get(`/verify`)

export const getAllFuncionariosRequest = () => axios.get(`/funcionarios`)

export const getFuncionarioByIdRequest = funcionarioId => axios.get(`/funcionarios/${funcionarioId}`)