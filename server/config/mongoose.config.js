import mongoose from "mongoose";

const carwashConnect = () => {
    mongoose
    .connect("mongodb://localhost/carwashdb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("conectado a la BD correctamente");
    })
    .catch((e) => {
        console.log(e);
    });
};

export default carwashConnect;
