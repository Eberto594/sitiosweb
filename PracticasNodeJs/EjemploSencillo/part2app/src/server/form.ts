import express, { Express, Request, Response } from "express";
import { getValidationResults, validate } from "./validation";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { helpers } from "handlebars";
import fs from 'fs';

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}));
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form",(req, res) => {
        // res.render("age", {helpers: {pass}});
        const filePath = path.join("./static/", 'contacts.json');
        
        //leer el archivo JSON
        fs.readFile(filePath, 'utf-8', (err: any, data: any) => {
            let contactos = [];

            if(err && err.code !== 'ENOENT'){
                console.log("Error al leer el archivo JSON: ", err)
            }

            if(!err && data){
                try{
                    contactos = JSON.parse(data);
                }
                catch(parseErr){
                    console.log("Error al parsear el archivo JSON: ", parseErr);
                }
            }

            res.render("age", {
                contactos,
                helpers: {pass}
            });

        })
    }); 

    app.post("/editar/:id", (req: Request, res: Response) => {
        // const { id } = req.params;
        // const { name, age} = req.body;
        // // let contacts = leerContactos();
        // let contactos:any = [];
        // const filePath = path.join("./static/", 'contacts.json');

        // //leer el archivo actual y agregar el nuevo contacto
        // fs.readFile(filePath, 'utf-8', (err: any, data:any) => {
        //     if(err && err.code !== 'ENOENT'){
        //         console.log("Error al leer el archivo JSON: ", err);
        //     }
        //     if(!err){
        //         try{
        //             contactos = JSON.parse(data);
        //         }
        //         catch(parseErr){
        //             console.log("Error al parsear el archivo JSON", parseErr);
        //         }
        //     }
        // });

        // contactos = contactos.map((contacto: any) =>
        //     contacto.id == id ? { ...contacto, name, age} : contacto
        // );
        // res.redirect("/form");

        const { id } = req.params;
        const { name, age } = req.body;
        let contactos = JSON.parse(readFileSync("./static/contacts.json").toString());


        // Actualizar el contacto en el array solo después de haber leído y parseado el archivo
        contactos = contactos.map((contacto: any) =>
            contacto.id == id ? { ...contacto, name, age } : contacto
        );

        // Guardar el arreglo actualizado en el archivo JSON
        writeFileSync("./static/contacts.json", JSON.stringify(contactos, null, 2));
        res.redirect("/form");
    });

    app.post("/borrar/:id", (req: Request, res: Response) => {
        res.end(req.body.id);
    })

    app.post("/form", validate("nombre").required().minLength(3), validate("edad").isInteger(), (req, resp) => {
            const validation = getValidationResults(req);
            console.log(req.body);
            const context = {
                ...req.body, validation,
                helpers: { pass }
            };
            

            if (validation.valid) {
                context.nextage = Number.parseInt(req.body.edad) + 1;
                
                const filePath = path.join("./static/", 'contacts.json');

                //leer el archivo actual y agregar el nuevo contacto
                fs.readFile(filePath, 'utf-8', (err: any, data:any) => {
                    if(err && err.code !== 'ENOENT'){
                        console.log("Error al leer el archivo JSON: ", err);
                    }

                    let contactos:any = [];

                    if(!err){
                        try{
                            contactos = JSON.parse(data);
                        }
                        catch(parseErr){
                            console.log("Error al parsear el archivo JSON", parseErr);
                        }
                    }

                    //Agregar el nuevo contacto
                    const nuevoContacto = {
                        id: Date.now(),
                        name: context.nombre,
                        age: context.edad
                    };

                    contactos.push(nuevoContacto);

                    // Guardar los datos actualizados en el archivo JSON
                    fs.writeFile(filePath, JSON.stringify(contactos, null, 2), (writeErr:any) => {
                        if (writeErr) {
                            console.error('Error al escribir en el archivo JSON:', writeErr);
                        } else {
                            console.log('Nuevo contacto agregado al archivo JSON');
                        }

                        // Renderizar la plantilla después de guardar los datos
                        // resp.render("age", {contactos, context});
                        resp.render("age", {
                            contactos,
                            helpers: {pass}
                        });
                    });

                })
            }
        });
}

const pass = (valid: any, propname: string, test:string) => {
    let propResult = valid?.results?.[propname];

    return `display: ${!propResult || propResult[test] ? "none" : "block"}`;
}

const guardarContacto = (name:string, age:string) => {
    
}

const leerContactos = () => {
    
}