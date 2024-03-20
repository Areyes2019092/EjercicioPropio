import { validationResult } from "express-validator";


/*
!: Es el operador de negación lógica. Cuando se coloca delante de una expresión booleana, invierte su valor. Es decir, si la expresión es true, 
el operador ! la convierte en false, y si la expresión es false, el operador ! la convierte en true.
Por lo tanto, !errors.isEmpty() se traduce a "no está vacío". Si la variable errors no está vacía (es decir, si contiene errores), 
la expresión isEmpty() devolverá false, y !false será true. 
Esto significa que la condición if (!errors.isEmpty()) se cumplirá, y el bloque de código dentro del if se ejecutará.
*/
export const validarInformacion = ( req, res, next ) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores});
    }
    next();
};