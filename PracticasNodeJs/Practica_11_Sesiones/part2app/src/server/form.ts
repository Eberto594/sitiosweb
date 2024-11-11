import express, { Express } from "express";
import repository from "./data";
import { getJsonCookie, setJsonCookie } from "./cookies";
import cookieMiddleware from "cookie-parser"
import { customSessionMiddleWare } from "./sessions/middleware";
import { getSession, sessionMiddleWare } from "./sessions/session_helpers";

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}));
    // habilita el middleware de análisis de cookies y especifica la llave secreta que se utilizará para las cookies firmadas.
    app.use(cookieMiddleware("mysecret"));
    // app.use(customSessionMiddleWare());
    app.use(sessionMiddleWare());
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await repository.getAllResults(rowLimit),
            // personalHistory: getJsonCookie(req, "personsalHistory")
            personalHistory: getSession(req).personalHistory
        });
    });

    app.post("/form", async (req, res) => {
        const nextage = Number.parseInt(req.body.age) + Number.parseInt(req.body.years);

        await repository.saveResult({...req.body, nextage});

        // let pHistory = [{
        //     name: req.body.name,
        //     age: req.body.age,
        //     years: req.body.years,
        //     nextage},
        //     ...(getJsonCookie(req, "personalHistory") || [])
        // ].splice(0,5);

        // setJsonCookie(res, "personalHistory", pHistory);

        req.session.personalHistory = [{
            id: 0, name: req.body.name, age: req.body.age,
            years: req.body.years, nextage},
            ...(req.session.personalHistory || [])].splice(0, 5);

            const context = {
                ...req.body, nextage,
                history: await repository.getAllResults(rowLimit),
                personalHistory: req.session.personalHistory
                };
            // Los resultados se pasan a la plantilla mediante una propiedad 
            // denominada history, que se utiliza para rellenar la tabla
            res.render("age", context);
    });
}
