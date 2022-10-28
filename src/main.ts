
import FinalizarCompra from "./aplicacao/caso-de-uso/finalizar-compra";
import ObtemPedidoPorCpf from "./aplicacao/caso-de-uso/obtem-pedido-por-cpf";
import VisualizaCarrinho from "./aplicacao/caso-de-uso/visualizar-carrinho";
import OrderController from "./infra/controller/pedido-controller";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import HapiHttp from "./infra/http/HapiAdapters";
import ItemRepositoryDatabase from "./infra/repository/memory/database/ItemRepositoryDatabase";
import OrderRepositoryMemory from "./infra/repository/memory/PedidoRepositoryMemory";

const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryMemory();
const preview = new VisualizaCarrinho(itemRepository);
const checkout = new FinalizarCompra(itemRepository, orderRepository);
const getOrderByCpf = new ObtemPedidoPorCpf(orderRepository);
// const httpServer = new ExpressAdapter();
const httpServer = new HapiHttp();
new OrderController(httpServer, preview, checkout, getOrderByCpf);
httpServer.listen(3000);
