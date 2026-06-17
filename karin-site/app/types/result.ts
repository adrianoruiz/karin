/**
 * Classe Result para padronização de respostas
 * Implementa o padrão Result para melhor tratamento de erros e sucesso
 */
export class Result<T> {
  private readonly _isSuccess: boolean;
  private readonly _error: string | null;
  private readonly _data: T | null;

  private constructor(isSuccess: boolean, error: string | null = null, data: T | null = null) {
    this._isSuccess = isSuccess;
    this._error = error;
    this._data = data;
  }

  /**
   * Verifica se o resultado foi bem-sucedido
   */
  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  /**
   * Verifica se o resultado falhou
   */
  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  /**
   * Obtém a mensagem de erro
   */
  public get error(): string {
    if (this._isSuccess) {
      throw new Error('Não é possível obter o erro de um resultado bem-sucedido');
    }
    return this._error!;
  }

  /**
   * Obtém os dados do resultado
   */
  public get data(): T {
    if (!this._isSuccess) {
      throw new Error('Não é possível obter dados de um resultado com falha');
    }
    return this._data!;
  }

  /**
   * Cria um resultado de sucesso
   */
  public static success<U>(data?: U): Result<U> {
    return new Result<U>(true, null, data || null);
  }

  /**
   * Cria um resultado de falha
   */
  public static failure<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
