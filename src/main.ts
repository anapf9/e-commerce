
import FinalizarCompra from "./aplicacao/usecase/finalizar-compra";
import ObtemPedidoPorCpf from "./aplicacao/usecase/obtem-pedido-por-cpf";
import VisualizaCarrinho from "./aplicacao/usecase/visualizar-carrinho";
import OrderController from "./infra/controller/pedido-controller";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiHttp from "./infra/http/HapiAdapters";
import CupomRepositoryMemory from "./infra/repository/memory/CupomRepositoryMemory";
import ItemRepositoryDatabase from "./infra/repository/memory/database/ItemRepositoryDatabase";
import OrderRepositoryMemory from "./infra/repository/memory/PedidoRepositoryMemory";

/**
 * É quem sabe orquestrar e inicializar a aplicação
 */

const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryMemory();
const cupomRepository = new CupomRepositoryMemory()
const preview = new VisualizaCarrinho(itemRepository, cupomRepository);
const checkout = new FinalizarCompra(itemRepository, orderRepository, cupomRepository);
const getOrderByCpf = new ObtemPedidoPorCpf(orderRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttp();
new OrderController(httpServer, preview, checkout, getOrderByCpf);
httpServer.listen(3000);
