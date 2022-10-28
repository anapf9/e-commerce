import Pedido from "../../../dominio/entidade/pedido";
import PedidoRepository from "../../../dominio/repositorio/PedidoRepository";

export default class OrderRepositoryMemory implements PedidoRepository {
	pedidos: Pedido[];

	constructor () {
		this.pedidos = [];
	}
	async buscaPorCpf(cpf: string): Promise<Pedido[]> {
		return this.pedidos.filter(pedido => pedido.cpf.value === cpf);
	}

	async salvar(pedido: Pedido): Promise<void> {
		this.pedidos.push(pedido);
	}

}