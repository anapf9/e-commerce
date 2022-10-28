import Pedido from "../../dominio/entidade/pedido";
import ItemRepository from "../../dominio/repositorio/ItemRepository";

type Input = {
	cpf: string,
	itensDoPedido: { idItem: number, quantidade: number }[]
}

export default class VisualizaCarrinho {

	constructor (readonly itemRepository: ItemRepository) {
	}

	async execute (input: Input): Promise<number> {
		const pedido = new Pedido(input.cpf);
		for (const itemDoPedido of input.itensDoPedido) {
			const item = await this.itemRepository.obtemItem(itemDoPedido.idItem);
			pedido.adicionaItem(item, itemDoPedido.quantidade);
		}
		const total = pedido.obtemTotal();
		return total;
	}
}

