import Cupom from "./cupom";
import Cpf from "./cpf";
import Item from "./item";
import ItemDoPedido from "./item-do-pedido";

export default class Ordem {
	distancia: number = 1000;
	cpf: Cpf;
	itensDoPedido: ItemDoPedido[];
	cupom?: Cupom;

	constructor (cpf: string) {
		this.cpf = new Cpf(cpf);
		this.itensDoPedido = [];
	}
	
	adicionaItem (item: Item, quantidade: number) {
		let novoItem = new ItemDoPedido(item.idItem, item.preco, quantidade)

		if(quantidade < 0) throw new Error("A quantidade de items não pode ser negativa");

		for (const itemDoPedido of this.itensDoPedido) {
			if (itemDoPedido.idItem === novoItem.idItem) novoItem.quantidade + 1
		};
		
		this.itensDoPedido.push(novoItem);
	}

	calculaFrete(item: Item) {
		if (item.preco < 10) throw new Error("O valor minimo do frete é R$ 10,00");
		const volume = item.calculaVolume()
		const densidade = item.calculaDensidade() / 1000
		return this.distancia * volume * densidade
	}

	adicionaCupom (cupom: Cupom) {
		this.cupom = cupom;
	}

	obtemTotal () {
		let total = this.itensDoPedido.reduce((valorCumulado, valorAtual) => {
			valorCumulado += valorAtual.obterTotal();
			return valorCumulado;
		}, 0);
		if (this.cupom) {
			total -= this.cupom.calculaDesconto(total);
		}
		return total;
	}
}
