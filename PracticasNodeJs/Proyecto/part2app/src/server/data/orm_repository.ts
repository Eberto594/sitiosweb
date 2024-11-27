import { Sequelize} from "sequelize";
import { ApiRepository, MateriaResult, Result } from "./repository";
import { addSeedData, defineRelationships, fromMaterialModel, fromOrmModel, initializeModels } from "./orm_helpers";
import { Calculation, MateriaModel, Person, ResultModel } from "./orm_models";

export class OrmRepository implements ApiRepository {
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
        defineRelationships();
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
        // La transacción se crea con el método Sequelize.transaction, 
        // que acepta una función de devolución de llamada que recibe un objeto Transaction
        return await this.sequelize.transaction(async (tx) => {
            // se utiliza el método findOrCreate para ver si hay objetos 
            // Person y Calculation en la base de datos que coincidan con los 
            // datos recibidos por el método saveResult.
            const [person] = await Person.findOrCreate({
                where: { name: r.name },
                transaction: tx
            });

            const [calculation] = await Calculation.findOrCreate({
                where: {
                    age: r.age, years: r.years, nextage: r.nextage
                },
                transaction: tx
            });

            return (await ResultModel.create({
                personId: person.id, calculationId: calculation.id},
                { transaction: tx })).id;
        });
        
    }
    

    // El método findAll se llama en la clase ResultModel y se configura 
    // con un objeto que tiene propiedades include, limit y order. 
    // La propiedad más importante es include, que le indica a Sequelize 
    // que siga las relaciones de clave externa para cargar datos relacionados 
    // y crear objetos a partir de los resultados
    async getAllResults(limit: number): Promise<Result[]> {
        return(
            await ResultModel.findAll({
                include: [Person, Calculation],
                limit,
                order: [["id", "DESC"]]
            })).map(row => fromOrmModel(row));
    }

    // propiedad where, que le indica a Sequelize que siga la 
    // relación de clave externa y que haga coincidir los objetos
    // Person mediante la propiedad name
    async getResultsByName(name: string, limit: number): Promise<Result[]> {
        return(
            await ResultModel.findAll({
                include: [Person, Calculation],
                where: {
                    "$Person.name$": name
                },
                limit, order: [["id", "DESC"]]
            })).map(row => fromOrmModel(row));
    }

    
    async getMaterias(limit: number): Promise<MateriaResult[]> {
        return (
            await MateriaModel.findAll({
                limit,
                order: [["id", "ASC"]]
            })).map(row => fromMaterialModel(row));
    }

    async getResultById(id: number): Promise<Result | undefined> {
        const model = await ResultModel.findByPk(id, {
            include: [Person, Calculation]
        });
        return model?fromOrmModel(model): undefined;
    }

    async delete(id: number): Promise<boolean> {
        // const count = await ResultModel.destroy({where: {id}});
        const count = await MateriaModel.destroy({where: {id}});
        return count == 1;
    }

    // Actualizar los datos en el ejemplo significa cambiar el nombre o el cálculo asociado con un resultado.
    async update(r: Result): Promise<Result | undefined> {
        const mod = await this.sequelize.transaction(async (transaction) => {
            // El primer paso es leer los datos que se van a actualizar de la base de datos utilizando la propiedad id del parámetro Result
            const stored = await ResultModel.findByPk(r.id);

            //Si hay una entrada coincidente en la base de datos, se utiliza
            //el método findOrCreate para localizar los datos de Person y 
            //Calculation que coinciden con el parámetro Result o crear 
            //nuevos datos si no hay coincidencias.
            if(stored !== null){
                const [person] = await Person.findOrCreate({
                    where: {name: r.name}, transaction
                });
                const [calculation] = await Calculation.findOrCreate({
                    where: {
                        age: r.age,
                        years: r.years,
                        nextage: r.nextage,
                    }, transaction
                });

                // actualizar los ID para que los datos almacenados hagan 
                // referencia a los nuevos registros de Persona y Cálculo y 
                // escribir los cambios en la base de datos, lo que se hace 
                // utilizando el método save
                stored.personId = person.id;
                stored.calculationId = calculation.id;
                // El método save es lo suficientemente inteligente como para detectar
                // cambios y solo actualizará la base de datos para las propiedades
                // cuyos valores hayan cambiado
                return await stored.save({transaction});
            }
        });
        // El paso final se realiza después de que se haya confirmado
        // la transacción y devuelve los datos modificados utilizando
        // el método getResultById
        return mod? this.getResultById(mod.id): undefined;
    }

}


