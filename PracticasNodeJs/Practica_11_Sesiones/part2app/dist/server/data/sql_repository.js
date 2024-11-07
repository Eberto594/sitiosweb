"use strict";
// IMPLEMENTACION DE LA INTERFAZ REPOSITORY
// SE CREA LA CLASE SQLREPOSITORY QUE IMPLEMENTA AL INTERFAZ REPOSITORY
// LA CUAL TIENE METODOS PARA GUARDAR Y OBTENER DATOS
// ESTA CLASE IMPLEMENTA ESTOS MEDODOS Y TIENE UN OBJETO DE TIPO 
// BASE DE DATOS. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepository = void 0;
const fs_1 = require("fs");
const sqlite3_1 = require("sqlite3");
const sql_queries_1 = require("./sql_queries");
const sql_helpers_1 = require("./sql_helpers");
class SqlRepository {
    db;
    // aqui se prepara la base de datos
    constructor() {
        // se crea la base de datos a utlizar
        this.db = new sqlite3_1.Database("age.db");
        // se leen las instruccioens de este archivo para crear las tablas necesarias
        this.db.exec((0, fs_1.readFileSync)("age.sql").toString(), err => {
            if (err != undefined)
                throw err;
        });
    }
    // La implementación del método saveResult ejecuta las tres sentencias SQL. Cada sentencia
    // requiere un objeto independiente para sus parámetros de consulta porque SQLite produce
    // un error si hay propiedades sin usar en el objeto de parámetros
    async saveResult(r) {
        return await new sql_helpers_1.TransactionHelper()
            .add(sql_queries_1.insertPerson, { $name: r.name })
            .add(sql_queries_1.insertCalculation, {
            $age: r.age,
            $years: r.years,
            $nextage: r.nextage
        })
            .add(sql_queries_1.insertResult, {
            $name: r.name,
            $age: r.age,
            $years: r.years,
            $nextage: r.nextage
        })
            .run(this.db);
    }
    getAllResults($limit) {
        return this.executeQuery(sql_queries_1.queryAllSql, { $limit });
    }
    getResultsByName($name, $limit) {
        return this.executeQuery(sql_queries_1.queryByNameSql, { $name, $limit });
    }
    // El método executeQuery utiliza el método Database.all, que ejecuta una 
    // consulta SQL y devuelve todas las filas que produce la base de datos.
    executeQuery(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err == undefined) {
                    resolve(rows);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
exports.SqlRepository = SqlRepository;
