import  jwt  from "jsonwebtoken";
import usuarioModelo from "../usuario/usuario.modelo.js";

export const ValidarToken = async(req, res, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(400).jSON({msg: 'El token no existe'});
    } try{
        const { uid } = jwt.verify(token, process.env.LLAVE);
        const usuarioRegistrado = await usuarioModelo.findOne({_id : uid}) 
        if(!usuarioRegistrado){
        return res.status(400).jSON({msg: 'El usuario no existe'});    
        }
        if(usuarioRegistrado.estado === false){
            return res.status(400).jSON({msg: 'El usaurio no existe'});
        }
        req.user = usuarioRegistrado;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({msg: 'Token invalido'})
    }

}