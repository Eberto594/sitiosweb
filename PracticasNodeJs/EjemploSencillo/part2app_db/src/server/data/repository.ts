// Un repositorio es una capa (layer) de código que aísla la base 
// de datos del resto de la aplicación, lo que facilita cambiar la 
// forma en que se leen y escriben los datos sin necesidad de cambiar 
// el código que utiliza esos datos.


// El tipo Result define propiedades para todas las columnas de datos en 
// las tablas de la base de datos en una estructura simple y plana
export interface Result {
    id: number,
    name: string,
    lastname: string,
    phone: string;
    // age: number,
    // years: number,
    // nextage: number
}

// La interfaz Repository define métodos para almacenar nuevos objetos Result, 
// consultar todos los resultados y los resultados que tienen un nombre específico.
export interface Repository {
    saveResult(r: Result): Promise<number>;
    getAllResults(limit: number) : Promise<Result[]>;
    getResultsByName(name: string, limit: number): Promise<Result[]>;
    updateResult(r: Result): Promise<void>;
    deteleResult(id:number): Promise<void>;
}