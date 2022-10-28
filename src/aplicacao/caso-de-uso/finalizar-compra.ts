import Pedido from "../../dominio/entidade/pedido";
import ItemRepository from "../../dominio/repositorio/ItemRepository";
import PedidoRepository from "../../dominio/repositorio/PedidoRepository";

type Input = {
	cpf: string,
	pedidoItems: { idItem: number, quantidade: number }[]
}

export default class FinalizarCompra {

	constructor (readonly itemRepository: ItemRepository, readonly pedidoRepository: PedidoRepository) {
	}

	async execute (input: Input): Promise<void> {
		const pedido = new Pedido(input.cpf);
		for (const pedidoItem of input.pedidoItems) {
			const item = await this.itemRepository.obtemItem(pedidoItem.idItem);
			pedido.adicionaItem(item, pedidoItem.quantidade);
		}
		await this.pedidoRepository.salvar(pedido);
	}
}
