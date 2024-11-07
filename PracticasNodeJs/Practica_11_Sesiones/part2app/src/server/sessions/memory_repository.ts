import { Session, SessionRepository } from "./repository";
import { randomUUID } from "crypto";

type SessionWrapper = {
    session: Session, 
    expires: Date
}

export class MemoryRepository implements SessionRepository {
    store = new Map<string, SessionWrapper>();

    async createSesion(): Promise<Session> {
        return {
            // la función randomUUID, que genera identificadores únicos que son adecuados para su uso como identificadores de sesión
            id: randomUUID(),
            data: {}
        }
    }

    async getSession(id: string): Promise<Session | undefined> {
        const wrapper = this.store.get(id);

        if(wrapper && wrapper.expires > new Date(Date.now())){
            // La función structuredClone es parte de la API estándar de JavaScript y crea una copia profunda de un objeto
            return structuredClone(wrapper.session);
        }
    }

    async saveSession(session: Session, expires: Date): Promise<void> {
        this.store.set(session.id, {session, expires});
    }
    
    async touchSession(session: Session, expires: Date): Promise<void> {
        const wrapper = this.store.get(session.id);
        
        if(wrapper){
            wrapper.expires = expires;
        }
    }
    


}