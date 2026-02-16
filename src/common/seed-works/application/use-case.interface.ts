

export interface IUseCase<I=void,O=void>{

    execute(input:I):Promise<O>
}