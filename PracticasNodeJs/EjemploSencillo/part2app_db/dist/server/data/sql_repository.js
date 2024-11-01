"use strict";
// // IMPLEMENTACION DE LA INTERFAZ REPOSITORY
// // SE CREA LA CLASE SQLREPOSITORY QUE IMPLEMENTA AL INTERFAZ REPOSITORY
// // LA CUAL TIENE METODOS PARA GUARDAR Y OBTENER DATOS
// // ESTA CLASE IMPLEMENTA ESTOS MEDODOS Y TIENE UN OBJETO DE TIPO 
// // BASE DE DATOS. 
Object.defineProperty(exports, "__esModule", { value: true });
// import { readFileSync } from "fs";
// import { Database } from "sqlite3";
// import { Repository, Result } from "./repository";
// import { queryAllSql, queryByNameSql, insertPerson, insertCalculation, insertResult } from "./sql_queries";
// import { TransactionHelper } from "./sql_helpers";
// export class SqlRepository implements Repository {
//     db: Database;
//     // aqui se prepara la base de datos
//     constructor(){
//         // se crea la base de datos a utlizar
//         this.db = new Database("age.db");
//         // se leen las instruccioens de este archivo para crear las tablas necesarias
//         this.db.exec(readFileSync("age.sql").toString(), err => {
//                 if (err != undefined) throw err;
//             }
//         );
//     }
//     // La implementación del método saveResult ejecuta las tres sentencias SQL. Cada sentencia
//     // requiere un objeto independiente para sus parámetros de consulta porque SQLite produce
//     // un error si hay propiedades sin usar en el objeto de parámetros
//     async saveResult(r: Result): Promise<number> {
//         return await new TransactionHelper()
//         .add(insertPerson, {$name: r.name})
//         .add(insertCalculation, {
//             $age: r.age,
//             $years: r.years,
//             $nextage: r.nextage
//         })
//         .add(insertResult, {
//             $name: r.name,
//             $age: r.age,
//             $years: r.years,
//             $nextage: r.nextage
//         })
//         .run(this.db);
//     }
//     getAllResults($limit: number): Promise<Result[]> {
//         return this.executeQuery(queryAllSql, { $limit });
//     }
//     getResultsByName($name: string, $limit: number): Promise<Result[]> {
//         return this.executeQuery(queryByNameSql, { $name, $limit });
//     }
//     // El método executeQuery utiliza el método Database.all, que ejecuta una 
//     // consulta SQL y devuelve todas las filas que produce la base de datos.
//     executeQuery(sql: string, params: any): Promise<Result[]> {
//         return new Promise<Result[]>((resolve, reject) => {
//             this.db.all<Result>(sql, params, (err, rows) => {
//                 if (err == undefined) {
//                     resolve(rows);
//                 } else {
//                     reject(err);
//                 }
//             })
//         });
//     }
// }
