export default class Cupom {

	constructor (
		readonly codigo: string, 
		readonly porcentagem: number, 
		readonly dataExpiracao?: Date
		) {
	}

	public calculaDesconto (total: number, dataPedido: Date): number {
		if (!this.valido(dataPedido)) throw new Error("Cupom Expirado");
		return (total * this.porcentagem)/100;
	}

	private valido(data: Date): boolean {
		// Só é valido se a data do cupom for maior ou igual a data do pedido
		return this.dataExpiracao ? this.dataExpiracao >= data : false
	} 
}
