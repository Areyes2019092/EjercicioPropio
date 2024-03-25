import { Router } from 'express';
import { check } from 'express-validator';
import { ValidarToken } from '../middlewares/validarToken.js';
import { CategoriaExiste, CategoriaNoExiste, CategoriaExisteId } from '../helpers/validarDB.js';
import { validarInformacion } from '../middlewares/validaInformacion.js';
import { crearCategoria, eliminarCategoria, actualizarCategoria, mostrarCategorias } from './categoria.controlador.js';

const router = Router();

router.delete(
    "/:id",
    [
        ValidarToken,
        check("id", "Id invalido").isMongoId(),
        check("id").custom(CategoriaExisteId),
        validarInformacion
    ], eliminarCategoria
)

router.put(
    "/:id",
    [
        ValidarToken,
        check("id", "No es valido el id").isMongoId(),
        check("id").custom(CategoriaExisteId),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("nombre").custom(CategoriaExiste),
        validarInformacion
    ], actualizarCategoria
)

router.get(
    "/",
    [
        ValidarToken,
        validarInformacion
    ],mostrarCategorias
)

router.post(
    "/",
    [
    ValidarToken,
    check("nombre", "La categoria es obligatoria").not().isEmpty(),
    check("nombre").custom(CategoriaExiste),
    validarInformacion
    ], crearCategoria   
)

export default router;