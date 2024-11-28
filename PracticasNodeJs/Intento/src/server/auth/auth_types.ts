export interface user {
    name: string;
    lastname: string;
    username: string;
    hashedPassword: Buffer;
    salt: Buffer;
    email: string;
    card: string;
    cvv: number;
    expM: number;
    expY: number;
    cardholder: string;
}

export interface UsuarioResult {
    nombre: string, 
    apellidoPa: string, 
    apellidoMa: string,
    correo: string, 
    matricula: string,
    contraseña: Buffer
    salt: Buffer 
}

export interface MateriaResult{
    nombre: string;    
    nivel: string,
    area: string,
    creditos: number,
}

export interface booking {
    entry: Date;
    id: Number;
    exit: Date;
    cost: number;
}
export interface Role {
    name: string;
    members: string[];
}
//interfcae p/ recuperar y almacenar credenciales
export interface AuthStore {
    getUser(name: string): Promise<UsuarioResult | null>;
    userExists(username: string): Promise<boolean>;
    getRoleMembers(roleName: string): Promise<string[]>;
    storeOrUpdateUser(nombre: string, apellidoPa: string, apellidoMa: string, password: string, correo: string, matricula: string): Promise<UsuarioResult>;
    storeMateria(nombre: string, nivel: string, area: string, creditos: number): Promise<MateriaResult>;
    getMaterias(limit: number): Promise<MateriaResult[]>
    validateCredentials(username: string, password: string): Promise<boolean>;
    isUser(username: string): Promise<boolean>;
    getRole(name: string): Promise<Role | null>;
    getRolesForUser(username: string): Promise<string[]>;
    storeOrUpdateRole(role: Role): Promise<Role>;
    validateMembership(username: string, role: string): Promise<boolean>;
}
