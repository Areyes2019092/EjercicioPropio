import mongoose, { Schema } from "mongoose";

const UsuarioModelo = mongoose.Schema({
    nombre:{
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    edad:{
        type: Number,
        required: [ true, 'La edad es obligatoria' ]
    },
    usuario:{
        type: String,
        required: [ true, 'El usuari es obligatorio' ]
    },
    correo:{
        type: String,
        required: [ true, 'El eamil es obligatorio' ]
    },
    contrasena:{
        type: String,
        required: [ true, 'La contra es obligatorio' ]
    },
    role:{
        type: String,
        default: 'Cliente'
    },
    estado:{
        type: Boolean,
        default: true
    }
})

//__v = numero de version
/**
 Cuando se convierte un objeto de usuario a JSON, este método toJSON se ejecuta automáticamente.
Dentro de este método, se quitan algunas partes del objeto que no queremos incluir en el JSON final, 
como el número de versión (__v), la contraseña (password), y el identificador único (_id).
Luego, se agrega un nuevo elemento al objeto JSON llamado uid, que contiene el mismo valor que _id.
Finalmente, el objeto JSON modificado se devuelve para ser usado o enviado según sea necesario.
 */
UsuarioModelo.methods.toJSON = function(){
 const {__v, contrasena, _id, ...resto } = this.toObject();
 resto.uid = _id;
 return resto;
}

export default mongoose.model('Usuario', UsuarioModelo)