import { Sequelize } from "sequelize";
import { Repository, Result } from "./repository";
import { addSeedData, fromOrmModel, initializeModels } from "./orm_helpers";
// import { addSeedData, defineRelationships, fromOrmModel, initializeModels } from "./orm_helpers";
import { Person } from "./orm_models";
// import { Calculation, Person, ResultModel } from "./orm_models";

export class OrmRepository implements Repository {
    sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            // dialecto especifica SQLite
            dialect: "sqlite",
            // opción de almacenamiento especifica el nombre del archivo
            storage: "orm_age.db",
            // puede resultar útil ver las consultas SQL que se generan, 
            // por lo que se configuran las opciones logging y logQueryParameters
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }

    // El método initModelAndDatabase llama a las funciones initializeModels
    // y defineRelationships para configurar los objetos del modelo de datos
    async initModelAndDatabase(): Promise<void>{
        initializeModels(this.sequelize);
        // defineRelationships();
        // El método drop le indica a Sequelize que elimine las tablas de la base de datos
        await this.sequelize.drop();
        // El método sync le indica a Sequelize que sincronice la base de datos con los
        // objetos del modelo de datos, lo que tiene el efecto de crear tablas para lo
        //  datos ResultModel, Person y Calculation
        await this.sequelize.sync();
        // se llama a la función addSeedData para agregar los datos iniciales a la base de datos
        await addSeedData(this.sequelize);
    }

    async saveResult(r: Result): Promise<number> {
        const result = await this.sequelize.transaction(async (tx) => {
            const person = await Person.create(
                { name: r.name, lastname: r.lastname, phone: r.phone},
                { transaction: tx }
            );
            
            // Verifica que `person.id` no sea `undefined`
            if (person.id === undefined) {
                throw new Error('Failed to create person: ID is undefined');
            }
    
            return person.id;
        });
    
        return result;
    }
    
    
    

    // El método findAll se llama en la clase ResultModel y se configura 
    // con un objeto que tiene propiedades include, limit y order. 
    // La propiedad más importante es include, que le indica a Sequelize 
    // que siga las relaciones de clave externa para cargar datos relacionados 
    // y crear objetos a partir de los resultados
    async getAllResults(limit: number): Promise<Result[]> {
        return(
            await Person.findAll({
                order: [["id", "ASC"]]
            })).map(row => fromOrmModel(row));
    }

    // propiedad where, que le indica a Sequelize que siga la 
    // relación de clave externa y que haga coincidir los objetos
    // Person mediante la propiedad name
    async getResultsByName(name: string, limit: number): Promise<Result[]> {
        return(
            await Person.findAll({
                where: {
                    "$Person.name$": name
                },
                limit, order: [["id", "ASC"]]
            })).map(row => fromOrmModel(row));
    }

    async updateResult(r: Result): Promise<void> {

        // console.log(this.getResultsByName(r.name, 10));
        try{
            // Verificar si el registro existe
            const existingRecord = await Person.findByPk(r.id);

            if (!existingRecord) {
                console.log(`No se encontró un registro con id ${r.id}.`);
                return;
            }


            const result = await Person.update(
                {name: r.name, lastname: r.lastname, phone: r.phone},
                {
                    where: {
                        id: r.id
                    },
                }
            );

            if(result[0] > 0){
                console.log(`Registro con id ${r.id} actualizado correctamente.`);
            }
            else{
                console.log(`No se encontró un registro con id ${r.id} para actualizar.`);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async deteleResult(id: number): Promise<void> {
        try {
            // Verificar si el registro existe
            const existingRecord = await Person.findByPk(id);
    
            if (!existingRecord) {
                console.log(`No se encontró un registro con id ${id}.`);
                return;
            }
    
            // Eliminar el registro
            const deletedCount = await Person.destroy({
                where: {
                    id: id
                }
            });
    
            // Comprobar si se eliminó el registro
            if (deletedCount > 0) {
                console.log(`Registro con id ${id} eliminado correctamente.`);
            } else {
                console.log(`No se encontró un registro con id ${id} para eliminar.`);
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    }
}


