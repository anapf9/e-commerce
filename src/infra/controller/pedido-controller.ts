import FinalizarCompra from "../../aplicacao/usecase/finalizar-compra";
import ObtemPedidoPorCpf from "../../aplicacao/usecase/obtem-pedido-por-cpf";
import VisualizaCarrinho from "../../aplicacao/usecase/visualizar-carrinho";
import HttpServerInterface from "../http/HttpServerInterface";

export default class PedidoController {

	constructor (
		readonly httpServer: HttpServerInterface,
		readonly visualizaCarrinho: VisualizaCarrinho, 
		readonly finlizaCompra: FinalizarCompra,
		readonly obtemPedidoPorCpf: ObtemPedidoPorCpf
	) {
		httpServer.on("post", "/visualiza-carrinho", async function (params: any, body: any) {
			const total = await visualizaCarrinho.execute(body);
			return { total };
		});
		
		httpServer.on("post", "/finaliza-compra", async function (params: any, body: any) {
			await finlizaCompra.execute(body)
		});
		
		httpServer.on("get", "/pedidos/:cpf", async function (params: any, body: any) {
			const pedidos = await obtemPedidoPorCpf.execute(params.cpf);
			return pedidos;
		});
	}
}
