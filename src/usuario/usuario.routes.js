import { Router } from "express";
import { check } from "express-validator";
import { CorreoNoExiste, UsaurioExiste } from "../helpers/validarDB.js";
import { ValidarToken } from "../middlewares/validarToken.js";
import usuarioModelo from "./usuario.modelo.js";
import { validarInformacion } from "../middlewares/validaInformacion.js";
import {  eliminarUsuario ,editarContrasena  , registrar, login, listadoUsaurios, editarNombre, listadoNombres } from "./usuario.controlador.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("edad", "La edad es obligatoria").isInt(),
        check("usuario","El usuario es obligatorio").not().isEmpty(),
        check("usuario").custom(UsaurioExiste),
        check("correo", "El correo es obligatorio").isEmail(),
        check("correo").custom(CorreoNoExiste),
        check("contrasena","La contrasena es obligatoria").isLength({
            min: 5,
        }),
        validarInformacion,
    ], registrar
);

router.put(
    "/",
    [
        ValidarToken,
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        validarInformacion
    ],editarNombre
)


router.put(
    "/contrasena",
    [
        ValidarToken,
        check("contrasena1","Es muy corta").isLength({
            min: 5
        }),
        check("contrasena2","Es muy corta").isLength({
            min: 5
        }),
        validarInformacion
    ],editarContrasena
)


router.delete(
    "/eliminar",
    [
        ValidarToken,
        check("contrasena","La contrasena es muy corta").isLength({
        min:5
        }),
        validarInformacion
    ], eliminarUsuario
);


router.get(
    "/",
    [
        validarInformacion,
    ], login
);

//Obtener usuario
router.get(
    "/listado",[
        validarInformacion
    ], listadoUsaurios
)

//Obtener nombres
router.get(
    "/listadoNombre",
    [
        validarInformacion
    ], listadoNombres
)


export default router;