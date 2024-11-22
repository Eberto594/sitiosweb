//La función style acepta el nombre de una hoja de estilo y genera un elemento de enlace para ella
export const style = (stylesheet: any) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
}

//La función valueOrZero verifica si un valor está definido y, si no lo está, devuelve cero.
export const valueOrZero = (value: any) => {
    return value !== undefined ? value : 0;
}
//La función increment incrementa un valor.
export const increment = (value: any) => {
    return Number(valueOrZero(value)) + 1;
}

//La función isOdd devuelve verdadero si un valor es impar.
export const isOdd = (value: any) => {
    return Number(valueOrZero(value)) % 2;
}

