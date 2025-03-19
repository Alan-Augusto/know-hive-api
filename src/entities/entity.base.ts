export interface IEntity {
  id?: number;
  [key: string]: any;  // Permite que outras propriedades sejam adicionadas
}

export class BaseEntity<T extends IEntity> {
  protected isValid = false;
  protected errors: string[] = [];

  constructor(protected _values: T) {
    this.validate();
  }

  // A lógica de validação será ajustada conforme os campos obrigatórios são definidos
  protected validate(): void {
    this.errors = [];
    this.isValid = true;

    // Implementar lógica de validação dinâmica aqui
    Object.keys(this._values).forEach((key) => {
      const value = this._values[key];
      if (this.isFieldRequired(key) && !value) {
        this.errors.push(`${key} é obrigatório.`);
        this.isValid = false;
      }
      // Adicionar validações extras aqui (ex: tipo de dado, comprimento mínimo, etc)
    });
  }

  // Verifica se o campo é obrigatório com base na interface
  private isFieldRequired(field: string): boolean {
    // Defina a lógica para saber se o campo é obrigatório. Pode ser feito via um objeto ou metadados
    return field !== 'id';  // Exemplo: todos os campos, exceto 'id', são obrigatórios
  }

  public valid(): boolean {
    return this.isValid;
  }

  public error(): string | null {
    return this.errors.length ? this.errors[0] : null;
  }

  // Retorna os valores da entidade (sem os metadados)
  public getValues(): T {
    return this._values;
  }
  
  
}
