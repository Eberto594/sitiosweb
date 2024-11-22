// El tipo Session define los requisitos mínimos para una Session, 
// lo que implica un ID y una propiedad de datos a la que se pueden 
// asignar datos arbitrarios indexados por valores de cadena
export type Session = {
    id: string,
    data: {[key: string]: any}
}


// La interfaz SessionRepository define métodos para crear una sesión, 
// recuperar una sesión almacenada previamente y guardar o actualizar una sesión.
export interface SessionRepository {
    createSesion(): Promise<Session>;
    getSession(id: string): Promise<Session | undefined>;
    saveSession(session: Session, expires: Date): Promise<void>;
    touchSession(session: Session, expires: Date): Promise<void>;
}