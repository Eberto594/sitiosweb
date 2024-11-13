// import { IncomingMessage, ServerResponse } from "http";
// import { signCookie, validateCookie } from "./cookies_signed";
import { CookieOptions, Request, Response } from "express";

// const setheaderName = "Set-Cookie";
// const cookieSecret = "mysecret";

// Por este motivo, el código del listado 2 verifica 
// si existe un encabezado Set-Cookie y agrega su valor 
// al arreglo de valores que se pasan al método setHeader. 
// Cuando se escribe la respuesta, Node.js agregará un encabezado
//  Set-Cookie para cada elemento del arreglo.
// export const setCookie = (res: ServerResponse, name: string, val: string) => {
//     // let cookieVal: any[] = [`${name}=${val}; Max-Age=300; SameSite=Strict`];
//     // if(res.hasHeader(setheaderName)){
//     //     cookieVal.push(res.getHeader(setheaderName));
//     // }
//     // res.setHeader("Set-Cookie", cookieVal);

//     const signedCookieVal = signCookie(val, cookieSecret);
//     let cookieVal: any[] = [`${name}=${signedCookieVal};Max-Age=300;SameSite=Strict`];

//     if(res.hasHeader(setheaderName)){
//         cookieVal.push(res.getHeader(setheaderName));
//     }
//     res.setHeader("Set-Cookie", cookieVal);
// }

export const setCookie = (res: Response, name: string, val: string, opts?:CookieOptions) => {
    // Response.cookie se utiliza para crear cookies y acepta un nombre, un valor y un objeto de configuración
    // El objeto de configuración tiene propiedades que corresponden a los atributos de cookies
    res.cookie(name, val, {
        maxAge: 300 * 1000,
        sameSite: "strict",
        signed: true,
        ...opts
    });
}

// export const setJsonCookie = (res: ServerResponse, name: string, val: any) => {
//     setCookie(res, name, JSON.stringify(val));
// }
export const setJsonCookie = (res:Response, name: string, val: any) => {
    setCookie(res, name, JSON.stringify(val));
}


// getCookie utiliza funciones de expresión regular y procesamiento de cadenas 
// de JavaScript para dividir la cadena de cookies y obtener el nombre y el valor 
// para localizar una cookie específica.
// export const getCookie = (req: IncomingMessage, key: string): string | undefined => {
//     let result: string | undefined = undefined;
//     req.headersDistinct["cookie"]?.forEach(header => {
//         header.split(";").forEach(cookie => {
//             const { name, val } = /^(?<name>.*)=(?<val>.*)$/.exec(cookie)?.groups as any;
//             if(name.trim() === key){
//                 result = validateCookie(val, cookieSecret);
//             }
//         })
//     });
//     return result;
// }

export const getCookie = (req:Request, key:string): string | undefined => {
    return req.signedCookies[key];
}

// export const getJsonCookie = (req:IncomingMessage, key:string): any => {
//     const cookie = getCookie(req, key);
//     return cookie ? JSON.parse(cookie): undefined;
// }

export const getJsonCookie = (req: Request, key: string): any => {
    const cookie = getCookie(req, key);
    return cookie ? JSON.parse(cookie): undefined;
}