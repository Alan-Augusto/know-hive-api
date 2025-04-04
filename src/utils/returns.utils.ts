import { Response } from "express";
import { IReturn } from "../entities/return";

export function resultError(mensagem:string):IReturn{
    const result:IReturn = { status: 'error', message: mensagem, data: null }
    return result;
}

export function resultSuccess(mensagem:string, object:any = null):IReturn{
    const result:IReturn = { status: 'success', message: mensagem, data: object }
    return result;
}

export function processReturn(value:any, successMessage?:string, errorMessage?:string):IReturn{
    if (value) {
        return resultSuccess(successMessage || "Operação realizada com sucesso", value);
    } else {
        return resultError(errorMessage || "Erro ao realizar operação");
    }
}

// Função para enviar resposta de sucesso
export function sendSuccess(res: Response, message: string, data: any){
    res.json(resultSuccess(message, data));
};

// Função para enviar resposta de erro
export function sendError(res: Response, message: string, statusCode: number = 500){
    res.status(statusCode).json(resultError(message));
};