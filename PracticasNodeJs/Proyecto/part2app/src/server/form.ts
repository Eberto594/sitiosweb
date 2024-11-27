import express, { Express } from "express";
import repository from "./data";
import cookieMiddleware from "cookie-parser"
import { sessionMiddleWare } from "./sessions/session_helpers";
import { roleGuard } from "./auth";
import { Result } from "./data/repository";

const rowLimit = 50;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}));
    // habilita el middleware de análisis de cookies y especifica la llave secreta que se utilizará para las cookies firmadas.
    app.use(cookieMiddleware("mysecret"));
    // app.use(customSessionMiddleWare());
    app.use(sessionMiddleWare());
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", async (req, resp) => {
        let nombreAlumno = resp.locals.user;
        resp.render("data", {
            // data: await repository.getAllResults(rowLimit),
            data: await repository.getMaterias(rowLimit)
        });
        console.log(resp.locals.user);
    });

    // la ruta /form/delete/:id está restringida al rol Administradores (Admins).
    app.post("/form/delete/:id", roleGuard("Admins"), async(req, res) => {
        const id = Number.parseInt(req.params["id"]);
        await repository.delete(id);
        res.redirect("/form");
        res.end();
    })

    // La ruta /form/add está restringida al rol Usuarios (Users),
    app.post("/form/add", roleGuard("Users"), async(req, res) => {
        const nextage = Number.parseInt(req.body["age"]) + Number.parseInt(req.body["years"]);
        await repository.saveResult({... req.body, nextage} as Result);
        res.redirect("/form");
        res.end();
    })

    // app.post("/form", async (req, res) => {
    //     const nextage = Number.parseInt(req.body.age) + Number.parseInt(req.body.years);

    //     await repository.saveResult({...req.body, nextage});

    //     // let pHistory = [{
    //     //     name: req.body.name,
    //     //     age: req.body.age,
    //     //     years: req.body.years,
    //     //     nextage},
    //     //     ...(getJsonCookie(req, "personalHistory") || [])
    //     // ].splice(0,5);

    //     // setJsonCookie(res, "personalHistory", pHistory);

    //     req.session.personalHistory = [{
    //         id: 0, name: req.body.name, age: req.body.age,
    //         years: req.body.years, nextage},
    //         ...(req.session.personalHistory || [])].splice(0, 5);

    //         const context = {
    //             ...req.body, nextage,
    //             history: await repository.getAllResults(rowLimit),
    //             personalHistory: req.session.personalHistory
    //             };
    //         // Los resultados se pasan a la plantilla mediante una propiedad 
    //         // denominada history, que se utiliza para rellenar la tabla
    //         res.render("age", context);
    // });
}
