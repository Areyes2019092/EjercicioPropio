import usuarioModelo from "../usuario/usuario.modelo";

export async function UsaurioExiste (user = ""){
    const usuarioExist = await usuarioModelo.findOne({ usuario : user });
    if(!usuarioExist){
        throw new Error(`El usuario ${usuarioExist.usuario} no existe`)
    }
}