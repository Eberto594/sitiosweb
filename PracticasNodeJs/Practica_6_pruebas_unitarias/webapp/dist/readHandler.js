"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const promises_1 = require("fs/promises");
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
const readHandler = async (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json");
        res.write(await (0, promises_1.readFile)("data.json"));
    }
    catch (err) {
        res.writeHead(500);
    }
    res.end();
};
exports.readHandler = readHandler;
