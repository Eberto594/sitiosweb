"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmAuthStore = void 0;
const sequelize_1 = require("sequelize");
const orm_auth_models_1 = require("./orm_auth_models");
const crypto_1 = require("crypto");
class OrmAuthStore {
    sequelize;
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({
            dialect: "sqlite",
            storage: "orm_age.db",
            logging: console.log,
            logQueryParameters: true //muestra parametros de consultas en los log
        });
        this.initModelAndDatabase();
    }
    async initModelAndDatabase() {
        (0, orm_auth_models_1.initializeAuthModels)(this.sequelize);
        await this.sequelize.drop();
        await this.sequelize.sync();
        // await this.storeOrUpdateUser("Erik", "Espinosa Lopez",
        //     "ErikLopez", "1234", "espinozalopezerik@gmail.com", "55799123412341234", 123, 10, 2031, "Erik Lopez");
        // await this.storeOrUpdateUser("Alice", "Lance",
        //     "alice", "mysecret", "alice@gmail.com", "5579111122223333", 113, 10, 2031, "Alice Lance");
        // await this.storeOrUpdateUser("Bob", "Peterson",
        //     "bob", "mysecret", "bob@gmail.com", "5579444433332222", 321, 8, 2030, "Bob Peterson");
        await this.storeOrUpdateUser("Eber", "Flores", "Vazquez", "holaquehace", "eber.flores@alumno.buap.mx", "202119501");
        await this.storeMateria("Matematicas", "Basico", "Ciencias basicas", 6);
        // await this.storeOrUpdateRole({
        //     name: "Admins", 
        //     members: ["ErikLopez", "alice"]
        // });
        await this.storeOrUpdateRole({
            name: "Users",
            members: ["Eber"]
        });
    }
    async getUser(username) {
        return await orm_auth_models_1.UsuarioModel.findByPk(username);
    }
    async userExists(username) {
        const userExists = await this.getUser(username); // Comprueba si el usuario existe.
        if (!userExists)
            return false;
        return true;
    }
    async getRoleMembers(roleName) {
        const role = await orm_auth_models_1.RoleModel.findOne({
            where: { name: roleName },
            include: [{ model: orm_auth_models_1.User, as: "CredentialsModels", attributes: ["username"] }] // Incluir los usuarios asociados
        });
        console.log("roles ", roleName, ": ", role);
        if (role) {
            // Extraer y devolver los nombres de usuario de los miembros
            return role.CredentialsModels?.map(user => user.nombre) ?? [];
        }
        return []; // Devolver una lista vacía si no se encuentra el rol
    }
    async storeOrUpdateUser(nombre, apellidoPa, apellidoMa, password, correo, matricula) {
        const salt = (0, crypto_1.randomBytes)(16); //se genera salt
        const contraseña = await this.createHashCode(password, salt); //se hashea password
        const [model] = await orm_auth_models_1.UsuarioModel.upsert({
            nombre, apellidoPa, apellidoMa, correo, matricula, contraseña, salt //inserta o actualiza usuario
        });
        return model; //modelo creado o actualizado
    }
    async storeMateria(nombre, nivel, area, creditos) {
        const [model] = await orm_auth_models_1.MateriaModel.upsert({
            nombre, nivel, area, creditos //inserta o actualiza usuario
        });
        return model;
    }
    async getMaterias(limit) {
        return await orm_auth_models_1.MateriaModel.findAll({
            limit,
            order: [["id", "ASC"]]
        });
    }
    async validateCredentials(username, password) {
        const storedCreds = await this.getUser(username); //busca a usuario
        if (storedCreds) {
            const candidateHash = //calcula  nuevo codigo hash con contraseña candidata(escrita)
             await this.createHashCode(password, storedCreds.salt);
            //compara hash de forma segura
            return (0, crypto_1.timingSafeEqual)(candidateHash, storedCreds.contraseña);
        } //falso si no es valido
        return false;
    } //crea un codigo hash usando pbkdf
    createHashCode(password, salt) {
        return new Promise((resolve, reject) => {
            //contraseña a codificar, salt, iteraciones,logitud, algoritmo
            (0, crypto_1.pbkdf2)(password, salt, 100000, 64, "sha512", (err, hash) => {
                if (err) {
                    reject(err);
                }
                ;
                resolve(hash); //devuelve hash generado
            });
        });
    }
    async isUser(username) {
        const roles = await this.getRolesForUser(username);
        console.log(roles);
        const isUser = roles.includes("Users");
        if (isUser)
            return true;
        return false;
    }
    async getRole(name) {
        const stored = await orm_auth_models_1.RoleModel.findByPk(name, {
            //datos asociados al modelo de credenciales, prop.del  modelo que se completarán en el resultado
            include: [{ model: orm_auth_models_1.User, attributes: ["username"] }]
        });
        if (stored) {
            return {
                name: stored.name,
                //miembros de ese rol
                members: stored.CredentialsModels?.map(m => m.nombre) ?? []
            };
        }
        return null;
    }
    async getRolesForUser(username) {
        return (await orm_auth_models_1.RoleModel.findAll({
            //acepta role y consulta bd p/ objetos coincidentes
            include: [{
                    model: orm_auth_models_1.User,
                    as: "CredentialsModels",
                    where: { username },
                    attributes: [] //no se recuperan las demas columnas
                }]
        })).map(rm => rm.name);
    }
    async storeOrUpdateRole(role) {
        return await this.sequelize.transaction(async (transaction) => {
            //en la bd se busca user coincidentes en role.members
            const users = await orm_auth_models_1.User.findAll({
                //valores donde username está en rolemembers
                where: { username: { [sequelize_1.Op.in]: role.members } },
                transaction //los datos no se pueden leer ni modificar  hasta confirmar transaction
            }); //se crea o encuentra un rol cuyo name coincida con role.name
            console.log(users.map(m => m.name));
            const [rm] = await orm_auth_models_1.RoleModel.findOrCreate({
                //role.name está en tabla role model
                where: { name: role.name }, transaction
            }); //establece asociación entre rol (rm) y usuarios
            await rm.setCredentialsModels(users, { transaction });
            console.log("\n\n");
            return role;
        });
    } //obtiene roles de un usuario y verifica que coincidan con un rol requerido
    async validateMembership(username, rolename) {
        //obtiene todos los roles del usuario con getRolesForUser, includes verifica si esta rolename
        return (await this.getRolesForUser(username)).includes(rolename);
    }
}
exports.OrmAuthStore = OrmAuthStore;
