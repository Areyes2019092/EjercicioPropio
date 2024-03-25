import bcryptjs from 'bcryptjs';
import usuarioModelo from "./usuario.modelo.js";
import { generarToken } from '../helpers/generarToken.js';
import { ValidarToken } from '../middlewares/validarToken.js';
import { validarInformacion } from '../middlewares/validaInformacion.js';
import { UsaurioExiste, CorreoNoExiste } from '../helpers/validarDB.js';


export const eliminarUsuario = async(req, res) =>{
    const { contrasena } = req.body;
    const permitido = req.user;
    const buscarUsaurio = await usuarioModelo.findById(permitido.id);
    const usuarioAcceso = bcryptjs.compareSync(contrasena, buscarUsaurio.contrasena)
    if(!usuarioAcceso ){
        return res.status(400).json({
            msg: "Datos Incorrectos"
          })
    }
    await usuarioModelo.findByIdAndUpdate(permitido.id, { estado: false });
    return res.status(200).json({
        msg: "Usuario Eliminado"
      });
};



export const editarNombre = async (req, res) => {
    // Extraer el nuevo nombre del cuerpo de la solicitud
    const nombre = req.body;
    
    // Extraer la información del usuario de la solicitud
    const contrasenaCorrecta = req.user;
    
    // Actualizar el nombre del usuario en la base de datos
    await usuarioModelo.findByIdAndUpdate(contrasenaCorrecta.id, nombre);
    
    // Obtener el nuevo nombre del usuario actualizado desde la base de datos
    const nombreNuevo = await usuarioModelo.findById(contrasenaCorrecta.id);
    
    // Enviar una respuesta JSON con el nuevo nombre del usuario
    res.status(200).json({msg: `Nombre usaurio: ${nombreNuevo}`})
};



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




export const login = async (req, res) => {
    // Extraer usuario y contraseña del cuerpo de la solicitud
    const { usuario, contrasena } = req.body;
    
    // Declaración de variables para el token y el usuario
    var token;
    var user;
    
    // Buscar el usuario en la base de datos por nombre de usuario
    user = await usuarioModelo.findOne({ usuario: usuario });
    
    // Si el usuario no se encuentra por nombre de usuario, buscar por correo electrónico
    if (!user) {
        return res.status(404).json({ msg: 'El usuario no existe' });    
    }
    
    // Verificar si el usuario está activo
    if (user.estado === false) {
        return res.status(404).json({ msg: 'El usuario no existe' });
    }
    
    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const permitido = bcryptjs.compareSync(contrasena, user.contrasena);
    
    // Si las contraseñas no coinciden, devolver un mensaje de error
    if (!permitido) {
        return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }
    
    // Generar un token de autenticación para el usuario
    token = await generarToken(user.id);
    
    // Enviar una respuesta con el token generado
    res.status(200).json({
        msg: `Bienvenido, aquí está su token: ${token}`
    });
};

export const listadoUsaurios = async (req, res)=>{
    try{
        const user = await usuarioModelo.find({estado: true});
        if(user.lenght === 0 ){
            return res.status(404).json({msg: 'No existen usuarios'});
        }
        //Crear array solo para almacenar los nombres
        const listadoNombres = user.map(usuarioArray => usuarioArray.usuario);
        res.status(200).json({msg: `Lista de usuarios: ${listadoNombres}`});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const listadoNombres = async (req, res)=>{
    try{
        const user = await usuarioModelo.find({estado: true});
        if(user.lenght === 0 ){
            return res.status(404).json({msg: 'No existen usuarios'});
        }
        //Crear array solo para almacenar los nombres
        const listadoNombres = user.map(usuarioArray => usuarioArray.nombre);
        res.status(200).json({msg: `Lista de usuarios: ${listadoNombres}`});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const editarContrasena = async(req, res)=>{
    const { contrasena1, contrasena2 } = req.body;
    const permitido = req.user;
    const encontrarContra = await usuarioModelo.findById(permitido.id );
    const nuevaConta = bcryptjs.compareSync(contrasena1, encontrarContra.contrasena)
    if(!nuevaConta){
        res.status(400).json({msg: 'La contraseña es incorrecta'});
    }
    const salt = bcryptjs.genSaltSync();
    const contrasenaFinal = bcryptjs.hashSync(contrasena2, salt);
    await usuarioModelo.findByIdAndUpdate(permitido.id, { contrasena: contrasenaFinal });

    
  res.status(200).json({
    msg: "Contraseña actualizada",

  });
}