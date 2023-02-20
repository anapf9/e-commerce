import Pedido from "../../dominio/entidade/pedido";
import CupomRepository from "../../dominio/repositorio/cupom-repository";
import ItemRepository from "../../dominio/repositorio/ItemRepository";
import PedidoRepository from "../../dominio/repositorio/PedidoRepository";

type Input = {
	cpf: string,
	pedidoItems: { idItem: number, quantidade: number }[]
	cupom?: string
	data?: Date;
}

export default class FinalizarCompra {

	constructor (
		readonly itemRepository: ItemRepository,
		readonly pedidoRepository: PedidoRepository, 
		readonly cupomRepository: CupomRepository
		) {}

	async execute ({cpf, pedidoItems, cupom, data}: Input): Promise<void> {
		const pedido = new Pedido(cpf, data);
		for (const pedidoItem of pedidoItems) {
			const item = await this.itemRepository.obtemItem(pedidoItem.idItem);
			pedido.adicionaItem(item, pedidoItem.quantidade);

			if(cupom) {
				const cupomExistente = await this.cupomRepository.obterCupom(cupom)
				
				if (cupomExistente) pedido.adicionaCupom(cupomExistente)
			}
		}
		await this.pedidoRepository.salvar(pedido);
	}
}
