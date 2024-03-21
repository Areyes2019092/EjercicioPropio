import usuarioModelo from "../usuario/usuario.modelo.js";

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