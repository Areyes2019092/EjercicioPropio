import  jwt  from "jsonwebtoken";

export const generarToken = (uid = "") => {
    return new Promise((resolve, reject)=>{
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.LLAVE,
            {
                expiresIn: '120h'
            },
            (errores, token) =>{
                errores ? (console.log(errores), reject(`El token no se pudo generar`) ): resolve(token);

    });
    })
}
/*
Definición de la función generarToken: Define una función llamada generarToken que acepta un parámetro opcional uid (identificador único). 
Este uid será el dato que se incluirá en el payload del token JWT.

Retorno de una promesa: Dentro de la función generarToken, se devuelve una nueva promesa que se resolverá o rechazará después de que se 
complete la generación del token JWT.

Creación del payload: Se define un objeto payload que contiene los datos que se incluirán en el token JWT. En este caso, solo se incluye el uid.

Creación del token JWT: Se llama a la función jwt.sign() para generar el token JWT. Esta función toma el payload,
 una clave secreta (process.env.LLAVE), opciones adicionales (en este caso, expiresIn que establece la expiración del token en 20 horas), 
 y una función de callback.

Manejo de errores y resolución de la promesa: En la función de callback de jwt.sign(), se verifica si hay errores. Si hay errores, 
se imprime en la consola y se rechaza la promesa con un mensaje indicando que el token no pudo ser generado. Si no hay errores, se 
resuelve la promesa con el token JWT generado.
*/