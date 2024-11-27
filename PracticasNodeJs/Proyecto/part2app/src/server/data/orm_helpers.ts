// El siguiente paso es indicarle a Sequelize cómo debe representarse 
// cada propiedad definida por las clases del modelo en la base de datos
import { DataTypes, Sequelize } from "sequelize";
import { Calculation, Person, ResultModel, MateriaModel, ControlMateria, Alumno } from "./orm_models";
import { MateriaResult, Result } from "./repository";

const primaryKey = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
};

export const initializeModels = (sequelize: Sequelize) => {
    // el método init, que acepta un objeto cuyas propiedades corresponden
    // a las definidas por la clase. A cada propiedad se le asigna un objeto 
    // de configuración que le indica a Sequelize cómo representar los datos en la base de datos.
    Person.init({
        ...primaryKey,
        name: { type: DataTypes.STRING }
    }, { sequelize });


    Calculation.init({
        ...primaryKey, 
        // se selecciona un valor de la clase DataTypes 
        // para especificar el tipo de datos SQL que se 
        // utilizará cuando se cree la base de datos
        age: { type: DataTypes.INTEGER},
        years: { type: DataTypes.INTEGER},
        nextage: { type: DataTypes.INTEGER},
    }, { sequelize });

    ResultModel.init({
        ...primaryKey,
        // El segundo argumento aceptado por el método init se utiliza para configurar el modelo de datos general
    },{sequelize})

    MateriaModel.init({
        ...primaryKey,
        nombre:{ type: DataTypes.STRING},
        nivel: {type: DataTypes.STRING},
        area: {type: DataTypes.STRING},
        creditos: {type: DataTypes.INTEGER}
    }, {sequelize})
}

// La clase base Model proporciona métodos para describir las relaciones entre las clases del modelo,
export const defineRelationships = () => {
    // la propiedad foreignKey se utiliza para especificar la llave foránea en la clase 
    // ResultModel para las relaciones uno a uno con los tipos Person y Calculation.
    ResultModel.belongsTo(Person, { foreignKey: "personId" });
    ResultModel.belongsTo(Calculation, { foreignKey: "calculationId"});
    //DEFINIR RELACIONES ENTRE LA TABLA MATERIA Y ALUMNO ENTRE LA TABLA CONTOROLMATERIAS
    // ControlMateria.belongsTo(Alumno, {foreignKey: "idAlumno"});
    // ControlMateria.belongsTo(MateriaModel, {foreignKey: "idMateria"});
}

export const addSeedData = async (sequelize: Sequelize) => {
    // El método Sequelize.query acepta una cadena que contiene una declaración SQL
    await sequelize.query(`
        INSERT INTO Calculations
        (id, age, years, nextage, createdAt, updatedAt) VALUES
        (1, 35, 5, 40, date(), date()),
        (2, 35, 10, 45, date(), date())`);
    
    // Sequelize agrega estas columnas para realizar un seguimiento de 
    // cuándo se crean y modifican las filas de la tabla.
    await sequelize.query(`
        INSERT INTO People (id, name, createdAt, updatedAt) VALUES
        (1, 'Alice', date(), date()), (2, "Bob", date(), date())`);


    await sequelize.query(`
        INSERT INTO ResultModels (calculationId, personId, createdAt, updatedAt) VALUES
        (1, 1, date(), date()), (2, 2, date(), date()),
        (2, 1, date(), date());`);

    await sequelize.query(`
        INSERT INTO MateriaModels (id, nombre, nivel, area, creditos, createdAt, updatedAt) VALUES
        (1, "Matematicas", "Basico", "Ciencias basicas", 6, date(), date()),
        (2, "Algebra Superior", "Basico", "Ciencias basicas", 6 , date(), date()),
        (3, "Calculo Diferencial", "Basico", "Ciencias bascias", 6 , date(), date()),
        (4, "Fisica I", "Basico", "Ciencias bascias", 6 , date(), date()),
        (5, "Algebra Lineal con elementos en geometria analitica.", "Basico", "Ciencias bascias", 6 , date(), date()),
        (6, "Calculo Integral", "Basico", "Ciencias bascias", 6 , date(), date()),
        (7, "Fisica II", "Basico", "Ciencias bascias", 6 , date(), date()),
        (8, "Matematicas Discretas", "Basico", "Ciencias bascias", 6 , date(), date()),
        (9, "Ecuaciones Diferenciales", "Basico", "Ciencias bascias", 6 , date(), date()),
        (10, "Probabilidad y Estadistica", "Formativo", "Ciencias bascias", 6 , date(), date()),
        (11, "Metodologia de la Programacion", "Basico", "Ingenieria en Computacion", 4 , date(), date()),
        (12, "Programacion", "Basico", "Ingenieria en Computacion", 6 , date(), date()),
        (13, "Programacion II", "Basico", "Ingenieria en Computacion", 6 , date(), date()),
        (14, "Ensamblador", "Basico", "Ingenieria en Computacion", 6 , date(), date()),
        (15, "Circuitos Electricos", "Basico", "Ingenieria en Computacion", 6 , date(), date()),
        (16, "Estructuras de Datos", "Basico", "Ingenieria en Computacion", 6 , date(), date()),
        (17, "Circuitos Electricos II", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (18, "Sistemas Operativos", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (19, "Analisis y Diseño de Algoritmos", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (20, "Ingenieria de Software", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (21, "Diseño Digital", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (22, "Sistemas Operativos II", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (23, "Arquitectura de Computadoras", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (24, "Programacion Concurrente y Paralelo", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (25, "Teoria de Control", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (26, "Tecnicas de Inteligencia Artificial", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (27, "Programacion Distribuida Aplicada", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (28, "Desarrollo de Aplicaciones Moviles", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (29, "Lenguajes de Programacion", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (30, "Introduccion a los Compiladores", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (31, "Computo Oblicuo", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (32, "Sistemas Empotrados", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (33, "Arquitectura Avanzada de Computadoras", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (34, "Investigacion de Operaciones", "Formativo", "Ingenieria en Computacion", 5 , date(), date()),
        (35, "Control Digital", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (36, "Robotica Aplicada", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (37, "Metodos Numericos", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (38, "Logica Matematica", "Formativo", "Ingenieria en Computacion", 6 , date(), date()),
        (39, "Graficacion", "Basico", "Area de Tecnologia", 6 , date(), date()),
        (40, "Modelos de Redes", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (41, "Bases de Datos para Ingenieria", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (42, "Redes Inalambricas", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (43, "Mineria de Datos", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (44, "Desarrollo de Aplicaciones Web", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (45, "Intercomunicacion y Seguridad en Redes", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (46, "Maquinas de Aprendizaje", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (47, "Ingenieria de Software Avanzada", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (48, "Interaccion Humano Computadora", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (49, "Procesamiento Digital de Imagenes", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (50, "Tratamiento de la Informacion", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (51, "Recuperacion de la Informacion", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (52, "Simulacion", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (53, "Super Computo", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (54, "Web Semantico", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (55, "REconocimiento de Patrones", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (56, "Sistemas de Tiempo Real", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (57, "Vision y Animacion por Computadora", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (58, "Sistemas Interactivos Modernos", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (59, "Almacenamiento de Datos", "Formativo", "Area de Tecnologia", 6 , date(), date()),
        (60, "Lengua Extrangera I", "Basico", "Formacion General Universitaria", 4 , date(), date()),
        (61, "Formacion Humana y Social", "Basico", "Formacion General Universitaria", 4 , date(), date()),
        (62, "Lengua Extrangera II", "Basico", "Formacion General Universitaria", 4 , date(), date()),
        (63, "DHPC", "Basico", "Formacion General Universitaria", 4 , date(), date()),
        (64, "Lengua Extrangera III", "Basico", "Formacion General Universitaria", 4 , date(), date()),
        (65, "Lengua Extrangera IV", "Basico", "Formacion General Universitaria", 4 , date(), date()),
        (66, "Administracion de Proyectos", "Formativo", "Optativa Desit", 5 , date(), date()),
        (67, "Animacion por Computadora", "Formativo", "Optativa Desit", 5 , date(), date()),
        (68, "Aplicaciones Multimedia", "Formativo", "Optativa Desit", 5 , date(), date()),
        (69, "Aplicaciones Web", "Formativo", "Optativa Desit", 5 , date(), date())
        `);
}

// función que transforma los objetos ResultModel proporcionados por 
// el paquete ORM en objetos Result requeridos por la interfaz Repository.
export const fromOrmModel = (model: ResultModel | null): Result => {
    return {
        id: model?.id || 0,
        name: model?.Person?.name || "",
        age: model?.Calculation?.age || 0,
        years: model?.Calculation?.years || 0,
        nextage: model?.Calculation?.age || 0
    }
}

export const fromMaterialModel = (model: MateriaModel | null) : MateriaResult => {
    return {
        id: model?.id || 0,
        nombre: model?.nombre || "",
        nivel: model?.nivel || "",
        area: model?.area || "",
        creditos: model?.creditos || 0
    }
}