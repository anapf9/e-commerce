import Pedido from "../../dominio/entidade/pedido";
import ItemRepository from "../../dominio/repositorio/ItemRepository";
import CupomRepository from "../../dominio/repositorio/cupom-repository";

type Input = {
	cpf: string,
	itensDoPedido: { idItem: number, quantidade: number }[];
	cupom?: string
}

export default class VisualizaCarrinho {
	constructor (
		readonly itemRepository: ItemRepository, 
		readonly cupomRepository: CupomRepository) {
	}

	async execute (input: Input): Promise<number> {
		const pedido = new Pedido(input.cpf);
		
		for (const itemDoPedido of input.itensDoPedido) {
			console.log('input.itensDoPedido', itemDoPedido);
			const item = await this.itemRepository.obtemItem(itemDoPedido.idItem);
			pedido.adicionaItem(item, itemDoPedido.quantidade);
		}

		if(input.cupom) {
			const cupom = await this.cupomRepository.obterCupom(input.cupom)
			if (cupom) pedido.adicionaCupom(cupom)
		}
		const total = pedido.obtemTotal();
		return total;
	}
}

