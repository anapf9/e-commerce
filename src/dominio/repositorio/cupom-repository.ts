import Cupom from "../entidade/cupom"
/**
 * Repository age em cima de agreggates e entidades
 */
export default interface CupomRepository {
    obterCupom(codigo:string): Promise<Cupom | undefined>;
    salvar(codigo:Cupom): Promise<void>;
}