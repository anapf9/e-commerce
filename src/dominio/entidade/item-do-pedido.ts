export default class ItemDoPedido {

	constructor (readonly idItem: number, readonly preco: number, readonly quantidade: number) {
		
	}

	obterTotal () {
		return this.preco * this.quantidade;
	}

	verificaValorNegativo () {
		if (this.idItem || this.preco || this.quantidade < 0) throw new Error(`Não pode ser um valor negativo`);
	}
}