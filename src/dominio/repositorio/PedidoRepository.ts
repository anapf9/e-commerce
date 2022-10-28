import Pedido from "../entidade/pedido";

export default interface PedidoRepository {
	salvar (order: Pedido): Promise<void>;
	buscaPorCpf (cpf: string): Promise<Pedido[]>;
}
