import axios from "axios";

//Configurando axios para que envíe las cookies en las peticiones

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export default instance;