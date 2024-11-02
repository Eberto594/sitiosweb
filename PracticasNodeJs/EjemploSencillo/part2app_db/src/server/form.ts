import express, { Express, Request, Response } from "express";
import repository from "./data";
import { getValidationResults, validate } from "./validation";
import { helpers } from "handlebars";

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}));
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await repository.getAllResults(rowLimit),
            helpers: {pass}
        });
    });

    app.post("/form", async (req, resp) => {

        const validation = getValidationResults(req);
        const context = {
            ...req.body,
            validation,
            helpers: {pass}
        };

        if(validation.valid){
            console.log(await repository.saveResult({...req.body}));
            // console.log(validation.valid);
            // console.log("validos");
            resp.render("age", {history: await repository.getAllResults(rowLimit), helpers:{pass}});
        }

        // Los resultados se pasan a la plantilla mediante una propiedad 
        // denominada history, que se utiliza para rellenar la tabla

        
    });

    app.post("/editar/:id", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        console.log(req.body.name);
        
        await repository.updateResult({...req.body, id: id});

        res.redirect("/form");
    });

    app.post("/borrar/:id", async(req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        await repository.deteleResult(id);

        res.redirect("/form");
    })

}

const pass = (valid: any, propname: string, test:string) => {
    let propResult = valid?.results?.[propname];
    return `display: ${!propResult || propResult[test] ? "none" : "block"}`;
}