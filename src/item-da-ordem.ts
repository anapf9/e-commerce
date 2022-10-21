export default class ItemDaOrdem {

	constructor (readonly idItem: number, readonly preco: number, readonly quantidade: number) {
	}

	obterTotal () {
		return this.preco * this.quantidade;
	}
}