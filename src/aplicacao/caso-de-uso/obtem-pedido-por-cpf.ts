import PedidoRepository from "../../dominio/repositorio/PedidoRepository";

type Output = {
	total: number
}

export default class ObtemPedidoPorCpf {

	constructor (readonly pedidoRepository: PedidoRepository) {
	}

	async execute (cpf: string): Promise<Output[]> {
		const output = [];
		const pedidos = await this.pedidoRepository.buscaPorCpf(cpf);
		for (const pedido of pedidos) {
			output.push({ total: pedido.obtemTotal() });
		}
		return output;
	}
}

