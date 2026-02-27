import mongoose from "mongoose";

const carwashConnect = () => {
    mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("conectado a la BD correctamente");
    })
    .catch((e) => {
        console.log(e);
    });
};

export default carwashConnect;
