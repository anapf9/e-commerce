import Cupom from "./cupom";
import Cpf from "./cpf";
import Item from "./item";
import ItemDaOrdem from "./item-da-ordem";

export default class Ordem {
	cpf: Cpf;
	orderItems: ItemDaOrdem[];
	cupom?: Cupom;

	constructor (cpf: string) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
	}
	
	adicionaItem (item: Item, quantidade: number) {
		const novoItem = new ItemDaOrdem(item.idItem, item.preco, quantidade)
		this.orderItems.push(novoItem);
	}

	adicionaCupom (cupom: Cupom) {
		this.cupom = cupom;
	}

	obtemTotal () {
		let total = this.orderItems.reduce((valorCumulado, valorAtual) => {
			valorCumulado += valorAtual.obterTotal();
			return valorCumulado;
		}, 0);
		if (this.cupom) {
			total -= this.cupom.calculaDesconto(total);
		}
		return total;
	}
}
