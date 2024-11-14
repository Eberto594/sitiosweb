// La interfaz Credentials describe las credenciales de un usuario tal como se almacenan para su validación
// El código hash y el salt son valores de Buffer, que es el tipo que Node.js usa para representar arreglos de bytes.
export interface Credentials {
    username: string,
    hashedPassword: Buffer,
    // se agrega un valor salt aleatorio a la contraseña para que 
    // los usuarios puedan tener la misma contraseña sin causar 
    // códigos hash duplicados en el almacén de credenciales.
    salt: Buffer
}

export interface Role {
    name: string;
    members: string[];
}

// La interfaz AuthStore define los métodos que se usarán para recuperar y almacenar credenciales
export interface AuthStore {
    getUser(name: string): Promise<Credentials | null>;
    storeOrUpdateUser(username: string, password: string): Promise<Credentials>;
    validateCredentials(username:string, password: string): Promise<boolean>;
    getRole(name:string): Promise<Role | null>;
    getRolesForUser(username: string):Promise<string[]>;
    storeOrUpdateRole(role:Role):Promise<Role>;
    validateMembership(username:string, role:string):Promise<boolean>;
}