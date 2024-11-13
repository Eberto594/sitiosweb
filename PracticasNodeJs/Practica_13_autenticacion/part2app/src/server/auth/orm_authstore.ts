import { Sequelize } from "sequelize";
import { CredentialsModel, initializeAuthModels } from "./orm_auth_models";
import { AuthStore, Credentials } from "./auth_types";
import { pbkdf2, randomBytes, timingSafeEqual } from "crypto";

// La clase OrmAuthStore implementa la interfaz AuthStore utilizando las características Sequelize presentadas por la clase CredentialsModel
export class OrmAuthStore implements AuthStore {
    sequelize: Sequelize;

    constructor(){
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "orm_auth.db",
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }


    async initModelAndDatabase(): Promise<void> {
        initializeAuthModels(this.sequelize);
        await this.sequelize.drop();
        await this.sequelize.sync();
        await this.storeOrUpdateUser("alice", "mysecret");
        await this.storeOrUpdateUser("bob", "mysecret");
    }

    // El método getUser se implementa utilizando el método }
    // findByPk, que consulta la base de datos utilizando un valor de llave principal
    async getUser(name: string){
        return await CredentialsModel.findByPk(name);
    }

    // El método storeOrUpdateUser se implementa utilizando el método upsert, 
    // que actualiza un valor existente si lo hay y, de lo contrario, crea un nuevo 
    // valor. Los datos se almacenarán en un archivo de base de datos SQLite llamado orm_auth.db.
    async storeOrUpdateUser(username: string, password: string): Promise<Credentials> {
        const salt = randomBytes(16);
        const hashedPassword = await this.createHashCode(password, salt);
        const [model] = await CredentialsModel.upsert({
            username, hashedPassword, salt
        });
        return model;
    }

    // El método validationCredentials utiliza el método getUser para recuperar 
    // las credenciales almacenadas y utiliza el valor de salt almacenado para 
    // calcular un nuevo código hash con la contraseña candidata, que luego 
    // se compara con el código hash almacenado, utilizando la función 
    // timingSafeEqual en el módulo de cifrado de Node.js. Esta función 
    // se utiliza para comparar códigos hash de forma segura,
    async validateCredentials(username: string, password: string): Promise<boolean> {
        const storedCreds = await this.getUser(username);
        if (storedCreds) {
            const candidateHash =
            await this.createHashCode(password, storedCreds.salt);
            return timingSafeEqual(candidateHash, storedCreds.hashedPassword);
        }
        return false;
    }

    // El método createHashCode acepta una contraseña y un valor de salt y 
    // crea un nuevo código hash, utilizando la función pbkdf2 del módulo criptográfico Node.js
    private createHashCode(password: string, salt: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            // Los argumentos de la función pbkdf2 son la contraseña que se 
            // va a codificar, el valor de salt, la cantidad de iteraciones 
            // utilizadas para generar el código hash, la longitud del código
            // hash y el algoritmo que se utilizará para generar el código hash.
            pbkdf2(password, salt, 100000, 64, "sha512", (err, hash) => {
                if(err){
                    reject(err)
                };
                resolve(hash);
            })
        })
    }
}