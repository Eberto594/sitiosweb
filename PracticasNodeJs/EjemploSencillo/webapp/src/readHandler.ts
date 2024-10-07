import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";

const leerContactos = () => {
    return JSON.parse(readFileSync("./static/contacts.json").toString());
}

const guardarContactos = (contactos: any) => {
    writeFileSync("./static/contacts.json", JSON.stringify(contactos, null,2));
}



export const readHandler = (req: Request, res: Response) => {
    const contactos = leerContactos();
    res.json(contactos);
    res.end();
}

export const addHandler = (req:Request, res:Response) => {
    const { nombre, apellido, telefono, correo} = req.body;
    const contactos = leerContactos();
    const nuevoContacto = {
        id: Date.now(),
        firstName: nombre,
        lastName: apellido,
        phone: telefono,
        email: correo
    };
    contactos.push(nuevoContacto);
    guardarContactos(contactos);
}

export const handler = (req: Request, res: Response) => {
    const contactos = leerContactos();
    console.log(contactos);
}

export const editHandler = (req:Request, res:Response) => {
    const { id } = req.params;
    const { firstName, lastName, phone, email} = req.body;
    let contacts = leerContactos();
    contacts = contacts.map((contact: any) =>
        contact.id == id ? { ...contact, firstName, lastName, phone, email} : contact
    );
    guardarContactos(contacts);
    res.redirect("/");
}

export const deleteHandler = (req:Request, res:Response) => {
    const { id } = req.params;
    let contacts = leerContactos();
    contacts = contacts.filter((contact: any) => contact.id != id);
    guardarContactos(contacts);
    res.redirect('/');
}

