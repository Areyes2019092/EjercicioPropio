import categoriaModelo from "./categoria.modelo.js";
import productoModelo from "../producto/producto.modelo.js";

export const crearCategoria = async(req, res)=>{
    const { nombre } = req.body;
    const permitido = req.user;
    if(permitido.rol !== "Administrador"){
        return res.status(400),json({msg: 'Permisos erroneos'});
    }
    try {
        const categoria = new categoriaModelo({nombre});
        await categoria.save();
        res.status(200).json({categoria});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
};

//Si hay error verificar este metodo
export const eliminarCategoria = async(req, res)=>{
    const { id } = req.params;
    const permitido = req.user;
    const iD = await categoriaModelo.findOne({nombre: "Default"});
    if(permitido.rol !== "Administrador"){
        return res.status(400).json({
            msg: 'No cuenta con los permisos requeridos'
        });
    }
    if (id === String(iD?._id)){
        return res.status(400).json({
            msg: 'No se puede eliminar esta categoria'
        });
    }
    const eliminarCategoria = await categoriaModelo.findById(id);
    await productoModelo.updateMany(
        {  categoria: eliminarCategoria._id  },
        { $set: { categoria: iD._id } }
    );
    await categoriaModelo.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: 'Categoria eliminada'
    });
}

export const actualizarCategoria = async(req, res)=>{
    const { id } = req.params;
    const permitido = req.user;
    if(permitido.rol !== "Administrador"){
        return res.status(400).json({msg: "Permisos erroneos"});
    }
    const { nombre } = req.body;
    await categoriaModelo.findByIdAndUpdate(id, { nombre: nombre });
    const nuevaCategoria = await categoriaModelo.findById(id);
    res.status(200).json({msg: `Categoria actualizada correctamente`, nuevaCategoria});
    
}

export const mostrarCategorias = async(req, res)=>{
    const permitido = req.user;
    if(permitido.rol !== "Administrador"){
        return res.status(400).json({msg: 'Permisos erroneos'});
    }
    const categorias = await categoriaModelo.find({estado: true});
    res.status(200).json({categorias});
}