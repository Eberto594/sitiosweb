const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Leer contactos desde el archivo JSON
function readContacts() {
    const data = fs.readFileSync('contacts.json');
    return JSON.parse(data);
}

// Guardar contactos en el archivo JSON
function writeContacts(contacts) {
    fs.writeFileSync('contacts.json', JSON.stringify(contacts, null,2));
}

// Página principal: lista de contactos
app.get('/', (req, res) => {
    const contacts = readContacts();
    res.render('index', { contacts });
});

// Agregar contacto
app.post('/add', (req, res) => {
    const { firstName, lastName } = req.body;
    const contacts = readContacts();
    const newContact = { id: Date.now(), firstName, lastName };
    contacts.push(newContact);
    writeContacts(contacts);
    res.redirect('/');
});

// Modificar contacto
app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    let contacts = readContacts();
    contacts = contacts.map(contact =>
        contact.id == id ? { ...contact, firstName, lastName } : contact
    );
    writeContacts(contacts);
    res.redirect('/');
});

// Eliminar contacto
app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    let contacts = readContacts();
    contacts = contacts.filter(contact => contact.id != id);
    writeContacts(contacts);
    res.redirect('/');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
