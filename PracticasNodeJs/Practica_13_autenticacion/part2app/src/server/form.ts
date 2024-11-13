import express, { Express } from "express";
import repository from "./data";
import cookieMiddleware from "cookie-parser"
import { sessionMiddleWare } from "./sessions/session_helpers";
import { Result } from "./data/repository";

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}));
    // habilita el middleware de análisis de cookies y especifica la llave secreta que se utilizará para las cookies firmadas.
    app.use(cookieMiddleware("mysecret"));
    app.use(sessionMiddleWare());
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", async (req, resp) => {
        resp.render("data", {
            data: await repository.getAllResults(rowLimit)
        });
    });

    app.post("/form/delete/:id", async (req, res) => {
        const id = Number.parseInt(req.params["id"]);
        await repository.delete(id);
        res.redirect("/form");
        res.end();
    });

    app.post("/form/add", async(req, res) => {
        const nextage = Number.parseInt(req.body["age"] + Number.parseInt(req.body["years"]));
        await repository.saveResult({
            ...req.body, 
            nextage} as Result);

        res.redirect("/form");
        res.end();
    })
}
