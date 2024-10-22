import express, { Express } from "express";
import { getValidationResults, validate } from "./validation";


// import { helpers } from "handlebars";
// import multer from "multer";
// import { sanitizeValue } from "./sanitize";

//debes decirle dónde puede almacenar los archivos que recibe
//en este caso, en memoria, sin embago, se puede hacer en disco
// const fileMiddleware = multer({storage: multer.memoryStorage()});

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}));
}

export const registerFormRoutes = (app: Express) => {
    // app.get("/form", (req, res) => {
    //     //Express decodifica cadenas de consulta de URL y las presenta a través de la propiedad Request.query.
    //     for(const key in req.query){
    //         res.write(`${key}: ${req.query[key]} \n`);
    //     }
    //     res.end();
    // });

    app.get("/form",(req, res) => {
        res.render("age", {helpers: {pass}});
    }); 

    //paquete Multer se aplica a rutas específicas para evitar
    //que los usuarios maliciosos carguen archivos en rutas donde no se esperan:
    // app.post("/form", fileMiddleware.single("datafile"), (req, res) => {
    //     // res.setHeader("Content-Type", "text/html");

    //     // for(const key in req.body){
    //     //     res.write(`<div>${key}:${sanitizeValue(req.body[key])}</div>`);
    //     // }

    //     // if(req.file){
    //     //     res.write(`<div>---\nFile: ${req.file.originalname}</div>`);
    //     //     res.write(`<div>${sanitizeValue(req.file.buffer.toString())}</div>`);
    //     // }
        
    //     // res.end();

    //     res.render("formData", {
    //         ...req.body, file: req.file,
    //         fileData: req.file?.buffer.toString()
    //     });
    // });

    // app.post("/form", (req, res) =>{
    //     res.render("age", {
    //         ...req.body,
    //         nextage: Number.parseInt(req.body.age) + 1
    //     });
    // });

    app.post("/form",
        validate("name").required().minLength(5),
        validate("age").isInteger(),
        (req, resp) => {
            const validation = getValidationResults(req);
            const context = {
                ...req.body, validation,
                helpers: { pass }
            };
            if (validation.valid) {
                context.nextage = Number.parseInt(req.body.age) + 1;
            }
            resp.render("age", context);
        });
}

const pass = (valid: any, propname: string, test:string) => {
    let propResult = valid?.results?.[propname];

    return `display: ${!propResult || propResult[test] ? "none" : "block"}`;
}