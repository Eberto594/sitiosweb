"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { SqlRepository } from "./sql_repository";
const orm_repository_1 = require("./orm_repository");
// Para que el repositorio esté disponible para el resto de la aplicación,
// Este archivo es responsable de instanciar el repositorio para que 
// el resto de la aplicación pueda acceder a los datos a través de la interfaz 
// Repository sin necesidad de saber qué implementación se ha utilizado.
// const repository: Repository = new SqlRepository();
const repository = new orm_repository_1.OrmRepository();
exports.default = repository;
