import productoModelo from "./producto.modelo.js";
import categoriaModelo from "../categoria/categoria.modelo.js";

export const actualizarProducto = async(req, re)=>{
    const { id } = req.params;
    const permitido = req.user;
    if(permitido.rol !== "Administrador"){
        res.status(401).json({msg: 'No se puede xd'});
    }
    
};