import express, { Express, Request, Response } from "express";
import repository from "./data";

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}));
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await repository.getAllResults(rowLimit)
        });
    });

    app.post("/form", async (req, resp) => {

        await repository.saveResult({...req.body});

        const context = {
        ...req.body,
        history: await repository.getAllResults(rowLimit)
        };
            // Los resultados se pasan a la plantilla mediante una propiedad 
            // denominada history, que se utiliza para rellenar la tabla
            resp.render("age", context);
    });

    app.post("/editar/:id", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        console.log(req.body.name);
        
        await repository.updateResult({...req.body, id: id});

        res.redirect("/form");

    });

}
