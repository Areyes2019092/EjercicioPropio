"use  strict";

import mongoose from "mongoose";

export const ConexionBaseDatos = async() => {
//Cuando la conexion se abre muestra lo que esta en el log
    try{
        mongoose.connection.on("open", () => {
        console.log("Contectado a la base de datos");
    });
    //y establece unas configuracione mongo
    //Serverselection Tiempo maximo que pasara conectarse
    //maxPool cantidad maxima de conexiones simultaneas
        await mongoose.connect(process.env.URI_MONGO,  {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 40,
        });
    }catch(error){
        throw new Error(error);
    }

};