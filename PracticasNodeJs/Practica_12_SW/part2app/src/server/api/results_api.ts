import { WebService } from "./http_adapter";
import { Result } from "../data/repository";
import repository from "../data";
import * as jsonpatch from "fast-json-patch";
import { validateModel } from "./validation_functions";
import { ResultModelValidation } from "./results_api_validation";


// La clase ResultWebService implementa la interfaz WebService<Result> e implementa los métodos mediante las características del repositorio
export class ResultWebService implements WebService<Result>{
    getOne(id: any): Promise<Result | undefined>{
        // return repository.getResultById(Number.parseInt(id));
        return repository.getResultById(id);
    }

    getMany(query: any): Promise<Result[]> {
        if(query.name){
            return repository.getResultsByName(query.name, 10);
        }
        else{
            return repository.getAllResults(10);
        }
    }

    async store(data: any): Promise<Result | undefined> {
        const {name, age, years} = data;
        // const nextage = Number.parseInt(age) + Number.parseInt(years);
        const nextage = age + years;
        const id  = await repository.saveResult({
            id:  0, 
            name,
            age, 
            years, 
            nextage});
        return await repository.getResultById(id);
    }

    detele(id: any): Promise<boolean> {
        return repository.delete(Number.parseInt(id));
    }

    replace(id: any, data: any): Promise<Result | undefined>{
        const { name, age, years, nextage } = data;
        // return repository.update({
        //     id,
        //     name, 
        //     age,
        //     years,
        //     nextage
        // })
        const validated = validateModel({
            name,
            age,
            years,
            nextage
        }, ResultModelValidation)
        
        return repository.update({
            id, 
            ...validated
        })
    }

    async modify(id: any, data: any): Promise<Result | undefined> {
        const dbData = await this.getOne(id);
        if(dbData !== undefined){
            // El método de implementación enumera las propiedades definidas 
            // por la interfaz Result y verifica si los datos recibidos de la solicitud contienen un valor de reemplazo

            // Los nuevos valores se aplican para actualizar los datos existentes,
            //  que luego se pasan al método replace del repositorio para almacenarlos
            // Object.entries(dbData).forEach(([prop, val]) => {
            //     (dbData as any)[prop] = data[prop]?? val;
            // });
            // return await this.replace(id, dbData)
            // El método applyPatch se utiliza para procesar el documento JSON Patch en un objeto.
            // El objeto result define una propiedad newDocument que devuelve el objeto modificado, 
            // que se puede almacenar en la base de datos.
            return await this.replace(id,
                jsonpatch.applyPatch(dbData, data).newDocument);
        }
    }
}