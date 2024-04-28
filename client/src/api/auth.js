import axios from "./axios";


export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequet = () => axios.get(`/verify`)

export const getUserByIdRequest = userId => axios.get(`/users/${userId}`)