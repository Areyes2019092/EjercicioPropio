import bcryptjs from 'bcryptjs';
import usuarioModelo from "./usuario.modelo.js";
import { generarToken } from '../helpers/generarToken.js';
import { ValidarToken } from '../middlewares/validarToken.js';
import { validarInformacion } from '../middlewares/validaInformacion.js';
import { UsaurioExiste, CorreoNoExiste } from '../helpers/validarDB.js';

export const registrar = async(req, res)=>{
    const { nombre, edad, usuario, correo, contrasena } = req.body;
    var rol;
    var user;
    try{
        if(correo.includes("@admin.gt")){
            rol = "Administrador";
            user = new usuarioModelo({ nombre, edad, usuario, correo,contrasena, rol });
        }else{
            user = new usuarioModelo({nombre, edad, usuario, correo, contrasena});
        }
        const salt = bcryptjs.genSaltSync();
        user.contrasena = bcryptjs.hashSync(contrasena, salt);
        await user.save();
        res.status(200).json({user});

    }catch(error){
        res.status(500).json({error: error.message});
    }
};