export default class Cupom {

	constructor (readonly codigo: string, readonly porcentagem: number) {
	}

	calculaDesconto (total: number) {
		return (total * this.porcentagem)/100;
	}
}
