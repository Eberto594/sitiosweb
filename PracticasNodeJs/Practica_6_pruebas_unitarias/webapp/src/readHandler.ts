import { Request, Response } from "express";
import { readFile } from "fs/promises";



// export const readHandler = (req: Request, res: Response) => {
//     res.cookie("sessionID", "mysecretcode");
//     req.pipe(res);
// }

// export const readHandler = (req:Request, res:Response) => {
//     readFile("data.json", (err, data) => {
//         if(err != null){
//             res.writeHead(500, err.message);
//         }
//         else{
//             res.setHeader("Content-Type", "application/json")
//             res.write(data);
//         }

//         res.end();
//     })
// }


export const readHandler = async(req:Request, res:Response) => {
    try{
        res.setHeader("Content-Type", "application/json")
        res.write(await readFile("data.json"));
        //No habrá cambios en la salida cuando se ejecuta el código 
        //porque Node.js ignora la palabra clave debugger de manera predeterminada.
        debugger
    }
    catch(err){
        res.writeHead(500);
    }
    res.end();
}