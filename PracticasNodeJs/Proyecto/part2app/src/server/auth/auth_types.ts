// La interfaz Credentials describe las credenciales de un usuario tal como se almacenan para su validación.
// se agrega un valor salt aleatorio a la contraseña para que los usuarios puedan tener la misma contraseña
//  sin causar códigos hash duplicados en el almacén de credenciales.
export interface Credentials {
    username: string;
    // El código hash y el salt son valores de Buffer, que es el tipo que Node.js usa para representar arreglos de bytes.
    hashedPassword: Buffer;
    salt: Buffer
}

export interface Role {
    name: string;
    members: string[];
}

// La interfaz AuthStore define los métodos que se usarán para recuperar y almacenar credenciales.
export interface AuthStore {
    getUser(name:string): Promise<Credentials | null>
    storeOrUpdateUser(username: string, password: string): Promise<Credentials>;
    validateCredentials(username: string, password: string): Promise<boolean>;
    getRole(name:string): Promise<Role | null>;
    getRolesForUser(username: string): Promise<string[]>;
    storeOrUpdateRole(role:Role): Promise<Role>;
    validateMembership(username: string, rolename:string): Promise<boolean>;
    updatePassword(username: string | undefined, newPassword: string): Promise<Credentials>;
}