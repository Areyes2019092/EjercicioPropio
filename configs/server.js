"use strict";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ConexionBaseDatos } from "./mongo.js";
import UsuarioRuta from "../src/usuario/usuario.routes.js"
import CategoriaRuta from "../src/categoria/categoria.routes.js";

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariopath = "/ejercicio/v1/usuario";
        this.categoriapath = "/ejercicio/v1/categoria";
        this.middlewares();
        this.conectarBase();
        this.routes();
    }
    
async conectarBase(){
    await ConexionBaseDatos();    
}

middlewares(){
    this.app.use(
        express.urlencoded({
          extended: false,
        })
      );
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
}

//Me falta crear las demas
routes(){
    this.app.use(this.usuariopath, UsuarioRuta);
    this.app.use(this.categoriapath, CategoriaRuta);
}

listen(){
    this.app.listen(this.port, () => {
        console.log("Servidor ejecutandose en puerto:", this.port);    
    });
}

}

export default Server;