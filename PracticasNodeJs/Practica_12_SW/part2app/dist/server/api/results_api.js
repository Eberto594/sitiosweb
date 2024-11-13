"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultWebService = void 0;
const data_1 = __importDefault(require("../data"));
// La clase ResultWebService implementa la interfaz WebService<Result> e implementa los métodos mediante las características del repositorio
class ResultWebService {
    getOne(id) {
        return data_1.default.getResultById(Number.parseInt(id));
    }
    getMany(query) {
        if (query.name) {
            return data_1.default.getResultsByName(query.name, 10);
        }
        else {
            return data_1.default.getAllResults(10);
        }
    }
    async store(data) {
        const { name, age, years } = data;
        const nextage = Number.parseInt(age) + Number.parseInt(years);
        const id = await data_1.default.saveResult({
            id: 0,
            name,
            age,
            years,
            nextage
        });
        return await data_1.default.getResultById(id);
    }
    detele(id) {
        return data_1.default.delete(Number.parseInt(id));
    }
    replace(id, data) {
        const { name, age, years, nextage } = data;
        return data_1.default.update({
            id,
            name,
            age,
            years,
            nextage
        });
    }
    async modify(id, data) {
        const dbData = await this.getOne(id);
        if (dbData !== undefined) {
            // El método de implementación enumera las propiedades definidas 
            // por la interfaz Result y verifica si los datos recibidos de la solicitud contienen un valor de reemplazo
            // Los nuevos valores se aplican para actualizar los datos existentes,
            //  que luego se pasan al método replace del repositorio para almacenarlos
            Object.entries(dbData).forEach(([prop, val]) => {
                dbData[prop] = data[prop] ?? val;
            });
            return await this.replace(id, dbData);
        }
    }
}
exports.ResultWebService = ResultWebService;
