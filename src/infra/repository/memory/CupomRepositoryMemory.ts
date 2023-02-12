import Cupom from "../../../dominio/entidade/cupom";
import Item from "../../../dominio/entidade/item";
import CupomRepository from "../../../dominio/repositorio/cupom-repository";
import ItemRepository from "../../../dominio/repositorio/ItemRepository";
import Connection from "../../database/ConnectionInterface";


export default class CupomRepositoryMemory implements CupomRepository {
	cupons: Cupom[]

	constructor () {
		this.cupons = []
	}

	async obterCupom(codigo: string): Promise<Cupom | undefined> {
		return this.cupons.find(cupom => cupom.codigo === codigo)
	}

	async salvar(cupom: Cupom): Promise<void> {
		this.cupons.push(cupom)
		
	}

}