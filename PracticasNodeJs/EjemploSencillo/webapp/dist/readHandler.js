"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHandler = exports.editHandler = exports.handler = exports.addHandler = exports.readHandler = void 0;
const fs_1 = require("fs");
const leerContactos = () => {
    return JSON.parse((0, fs_1.readFileSync)("./static/contacts.json").toString());
};
const guardarContactos = (contactos) => {
    (0, fs_1.writeFileSync)("./static/contacts.json", JSON.stringify(contactos, null, 2));
};
const readHandler = (req, res) => {
    const contactos = leerContactos();
    res.json(contactos);
    res.end();
};
exports.readHandler = readHandler;
const addHandler = (req, res) => {
    const { nombre, apellido, telefono, correo } = req.body;
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
};
exports.addHandler = addHandler;
const handler = (req, res) => {
    const contactos = leerContactos();
    console.log(contactos);
};
exports.handler = handler;
const editHandler = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone, email } = req.body;
    let contacts = leerContactos();
    contacts = contacts.map((contact) => contact.id == id ? { ...contact, firstName, lastName, phone, email } : contact);
    guardarContactos(contacts);
    res.redirect("/");
};
exports.editHandler = editHandler;
const deleteHandler = (req, res) => {
    const { id } = req.params;
    let contacts = leerContactos();
    contacts = contacts.filter((contact) => contact.id != id);
    guardarContactos(contacts);
    res.redirect('/');
};
exports.deleteHandler = deleteHandler;
