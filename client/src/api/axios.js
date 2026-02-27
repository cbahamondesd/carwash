import axios from "axios";

//Configurando axios para que envíe las cookies en las peticiones

const instance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

export default instance;