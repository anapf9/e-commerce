export default class Cupom {

	constructor (
		readonly codigo: string, 
		readonly porcentagem: number, 
		// readonly dataExpiracao: Date
		) {
		// if (!this.valido()) throw new Error("Cupom Expirado");
	}

	public calculaDesconto (total: number): number {
		return (total * this.porcentagem)/100;
	}

	/* private valido() {
		// Só é valido se a data do cupom for maior ou igual a data atual
		const dataAtual = new Date()
		return this.dataExpiracao >= dataAtual
	} */
}
