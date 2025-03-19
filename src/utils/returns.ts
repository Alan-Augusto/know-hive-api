import { IRetorno } from "../entities/retorno";

export function resultError(mensagem:string):IRetorno{
    const result:IRetorno = { success: false, message: mensagem, result: null }
    return result;
}

export function resultSuccess(mensagem:string, object:any[]|null = null):IRetorno{
    const result:IRetorno = { success: true, message: mensagem, result: object }
    return result;
}

export function processReturn(value:any, successMessage?:string, errorMessage?:string):IRetorno{
    if (value) {
        return resultSuccess(successMessage || "Operação realizada com sucesso", value);
    } else {
        return resultError(errorMessage || "Erro ao realizar operação");
    }
}

export function isValueValid(value:any):boolean{
    return value != null && value != undefined;
}