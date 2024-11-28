"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmAuthStore = void 0;
const sequelize_1 = require("sequelize");
const orm_auth_models_1 = require("./orm_auth_models");
const crypto_1 = require("crypto");
// La clase OrmAuthStore implementa la interfaz AuthStore utilizando las 
// características Sequelize presentadas por la clase CredentialsModel
class OrmAuthStore {
    sequelize;
    // ormRepository = new OrmRepository();
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({
            dialect: "sqlite",
            // storage: "orm_auth.db",
            storage: "orm_age.db",
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }
    async initModelAndDatabase() {
        (0, orm_auth_models_1.initilizeAuthModels)(this.sequelize);
        await this.sequelize.drop();
        await this.sequelize.sync();
        await this.storeOrUpdateUser("alice", "mysecret");
        await this.storeOrUpdateUser("bob", "mysecret");
        await this.storeOrUpdateUser("eber", "holaquehace");
        await this.storeOrUpdateUser("alberto", "zoom");
        await this.storeOrUpdateUser("montse", "zapato");
        await this.storeOrUpdateRole({
            name: "Users",
            members: ["alice", "bob", "eber", "alberto"]
        });
        await this.storeOrUpdateRole({
            name: "Admins",
            members: ["alice", "alberto", "eber"]
        });
        // let usuarios = await this.ormRepository.getUser("montserrat");
        // console.log(usuarios);
    }
    // El método getUser se implementa utilizando el método findByPk, que 
    // consulta la base de datos utilizando un valor de llave principal.
    async getUser(name) {
        return await orm_auth_models_1.CredentialsModel.findByPk(name);
    }
    // El método storeOrUpdateUser se implementa utilizando el método upsert, que 
    // actualiza un valor existente 
    // si lo hay y, de lo contrario, crea un nuevo valor. Los datos se almacenarán 
    // en un archivo de base de datos SQLite llamado orm_auth.db.
    async storeOrUpdateUser(username, password) {
        const salt = (0, crypto_1.randomBytes)(16);
        const hashedPassword = await this.createHashCode(password, salt);
        const [model] = await orm_auth_models_1.CredentialsModel.upsert({
            username, hashedPassword, salt
        });
        return model;
    }
    // El método validationCredentials utiliza el método getUser para recuperar
    // las credenciales almacenadas y utiliza el valor de salt almacenado para
    // calcular un nuevo código hash con la contraseña candidata, que luego se
    // compara con el código hash almacenado, utilizando la función timingSafeEqual
    // en el módulo de cifrado de Node.js. Esta función se utiliza para comparar códigos hash de forma segura,
    async validateCredentials(username, password) {
        const storedCreds = await this.getUser(username);
        if (storedCreds) {
            const candidateHash = await this.createHashCode(password, storedCreds.salt);
            return (0, crypto_1.timingSafeEqual)(candidateHash, storedCreds.hashedPassword);
        }
        return false;
    }
    // El método getRole consulta la base de datos en busca de objetos RoleModel y utiliza 
    // la opción include para incluir los objetos CredentialsModel asociados en los resultados, 
    // que se transforman en el resultado Role requerido por la interfaz RoleStore
    async getRole(name) {
        const stored = await orm_auth_models_1.RoleModel.findByPk(name, {
            include: [{ model: orm_auth_models_1.CredentialsModel, attributes: ["username"] }]
        });
        if (stored) {
            return {
                name: stored.name,
                members: stored.CredentialsModels?.map(m => m.username) ?? []
            };
        }
        return null;
    }
    // La propiedad include está configurada con un objeto cuya propiedad de modelo especifica
    // los datos asociados y la propiedad de atributos especifica las propiedades del modelo 
    // que se completarán en el resultado.
    async getRolesForUser(username) {
        // El método findAll se utiliza para consultar todos los objetos RoleModel, pero
        // la cláusula where se utiliza para hacer una selección en función de los datos
        // asociados de modo que solo se incluyan los objetos RoleModel que tengan asociaciones
        // con objetos CredentialsModel cuya propiedad de nombre de usuario coincida con un valor
        // determinado. Se utiliza un arreglo de atributos vacío para excluir todos los datos de
        // CredentialModel del resultado
        return (await orm_auth_models_1.RoleModel.findAll({
            include: [{
                    model: orm_auth_models_1.CredentialsModel,
                    where: { username },
                    attributes: []
                }]
        })).map(rm => rm.name);
    }
    // El método storeOrUpdateRole acepta un objeto Role y consulta la base de
    // datos para todos los objetos CredentialsModel coincidentes, lo que garantiza
    // que se ignore cualquier nombre para el que no haya credenciales de usuario.
    async storeOrUpdateRole(role) {
        return await this.sequelize.transaction(async (transaction) => {
            const users = await orm_auth_models_1.CredentialsModel.findAll({
                where: { username: { [sequelize_1.Op.in]: role.members } },
                transaction
            });
            // El método findOrCreate garantiza que exista un objeto RoleModel en la
            // base de datos, y el método setCredentialsModels se utiliza para establecer
            // la membresía del rol. Se utiliza una transacción para garantizar que la
            // actualización se realice de forma atómica
            const [rm] = await orm_auth_models_1.RoleModel.findOrCreate({
                where: { name: role.name }, transaction
            });
            await rm.setCredentialsModels(users, { transaction });
            return role;
        });
    }
    async updatePassword(username, newPassword) {
        const salt = (0, crypto_1.randomBytes)(16);
        // Hashear la nueva contraseña antes de guardarla
        const hashedPassword = await this.createHashCode(newPassword, salt);
        // Actualizar la contraseña en la base de datos
        const [model] = await orm_auth_models_1.CredentialsModel.upsert({
            username, hashedPassword, salt
        }
        // { hashedPassword }, // Campos a actualizar
        // { where: { username } }       // Condición para identificar al usuario
        );
        // `updatedRows` devuelve el número de filas afectadas
        return model;
    }
    // El método validationMembership obtiene los roles a los que se ha asignado un
    // usuario y verifica que uno de ellos coincida con el rol requerido.
    async validateMembership(username, rolename) {
        return (await this.getRolesForUser(username)).includes(rolename);
    }
    // El método createHashCode acepta una contraseña y un valor de salt y crea un nuevo código 
    // hash, utilizando la función pbkdf2 del módulo criptográfico Node.js
    createHashCode(password, salt) {
        // Los argumentos de la función pbkdf2 son la contraseña que se va a codificar, 
        // el valor de salt, la cantidad de iteraciones utilizadas para generar el código 
        // hash, la longitud del código hash y el algoritmo que se utilizará para generar 
        // el código hash
        return new Promise((resolve, reject) => {
            (0, crypto_1.pbkdf2)(password, salt, 100000, 64, "sha512", (err, hash) => {
                if (err) {
                    reject(err);
                }
                ;
                resolve(hash);
            });
        });
    }
}
exports.OrmAuthStore = OrmAuthStore;