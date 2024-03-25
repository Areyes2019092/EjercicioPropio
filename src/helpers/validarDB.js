import usuarioModelo from "../usuario/usuario.modelo.js";
import productoModelo from "../producto/producto.modelo.js";
import categoriaModelo from "../categoria/categoria.modelo.js";


//Usuario
export async function UsaurioExiste (user = ""){
    const usuarioExist = await usuarioModelo.findOne({ usuario : user });
    if(usuarioExist){
        throw new Error(`El usuario ${usuarioExist.usuario} ya existe`)
    }
}

export async function CorreoNoExiste(email= ""){
    const emailExiste = await usuarioModelo.findOne({correo: email});
    if(emailExiste){
        throw new Error(`El correo ${emailExiste.correo} ya existe`)
    } 
}

//Categoria

export async function CategoriaExiste(category = ""){
    const categoria = await categoriaModelo.findOne({nombre: category});
    if(categoria){
        throw new Error(`La categoria ${categoria.nombre} ya existe`)
    }
}

export async function CategoriaExisteId(id= ""){
    const categoria = await categoriaModelo.findById({id});
    if(!categoria){
        throw new Error(`La  categoria no existe`)
    }
}

export async function CategoriaNoExiste(category = ""){
    const categoria = await categoriaModelo.findOne({nombre: category});
    if(!categoria){
        throw new Error(`La categoria ${categoria.nombre} no existe`)
    }
}