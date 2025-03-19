export interface IRetorno{
    success:boolean;
    message:string;
    result:any | any[] | null;
}

export class BaseService{
    error(mensagem:string):IRetorno{
        const result:IRetorno = { success: false, message: mensagem, result: null }
        return result;
    }

    success(mensagem:string, object:any[]|null = null):IRetorno{
        const result:IRetorno = { success: true, message: mensagem, result: object }
        return result;
    }

    processReturn(value:any, sucessMessage?:string, errorMessage?:string):IRetorno{
        console.log("processReturn",value);
        if (value == null || value == undefined) {
            return this.error(errorMessage || "Erro ao realizar operação");
        } else {
            return this.success(sucessMessage || "Operação realizada com sucesso", value);
        }
    }

    
}