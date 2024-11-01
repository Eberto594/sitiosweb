DROP TABLE IF EXISTS Results;
DROP TABLE IF EXISTS Calculations;
DROP TABLE IF EXISTS People;


-- La tabla Calculations realiza un seguimiento de los cálculos de edad 
-- que se han realizado y tiene columnas para los valores de edad y año 
-- proporcionados por el usuario y la edad futura que se ha calculado
CREATE TABLE IF NOT EXISTS `Calculations` (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    `age` INTEGER,
    years INTEGER, 
    `nextage` INTEGER
);

-- La tabla People realiza un seguimiento de los nombres que proporcionan 
-- los usuarios.
CREATE TABLE IF NOT EXISTS `People` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255)
);

-- La tabla Results realiza un seguimiento de los resultados haciendo 
-- referencia a un nombre y un cálculo.
CREATE TABLE IF NOT EXISTS `Results` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    calculationId INTEGER REFERENCES `Calculations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    personId INTEGER REFERENCES `People` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO Calculations (id, age, years, nextage) VALUES
(1, 35, 5, 40), (2, 35, 10, 45);

INSERT INTO People (id, name) VALUES
(1, 'Alice'), (2, "Bob");

INSERT INTO Results (calculationId, personId) VALUES
(1, 1), (2, 2), (2, 1);