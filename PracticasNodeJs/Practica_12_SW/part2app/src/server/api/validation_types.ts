// El tipo WebServiceValidation describe los requisitos de validación para un servicio web
export interface WebServiceValidation {
    // La propiedad keyValidator especifica los requisitos de validación 
    // para los valores de ID que identifican los registros de datos,
    // utilizando el tipo ValidationRule
    keyValidator?: ValidationRule;
    getMany?: ValidationRequirements;
    store?: ValidationRequirements;
    replace?: ValidationRequirements;
    modify?: ValidationRequirements;
}

// un objeto ValidationRequirements, que puede especificar la forma del objeto que espera el servicio web
export type ValidationRequirements = {
    [key: string] : ValidationRule
}

// Una ValidationRule puede ser un arreglo de funciones 
// de prueba que se aplicarán a un valor o un objeto que 
// además especifica si se requiere un valor y un convertidor 
// que transformará el valor en el tipo esperado por el método de servicio web.
export type ValidationRule = ((value: any) => boolean)[] | {
    required?: boolean,
    validation: ((value: any) => boolean)[],
    converter?: (value:any) => any,
}

// La clase ValidationError representa un problema al validar los datos enviados por el cliente en una solicitud.
export class ValidationError implements Error {
    constructor(public name: string, public message: string){}
    stack?: string | undefined;
    cause?: unknown;
}

export type ModelValidation = {
    modelRule?: ValidationRule,
    propertyRules?: ValidationRequirements
}
