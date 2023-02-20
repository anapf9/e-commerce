import FinalizarCompra from "../src/aplicacao/usecase/finalizar-compra";
import ObtemPedidoPorCpf from "../src/aplicacao/usecase/obtem-pedido-por-cpf";
import Cupom from "../src/dominio/entidade/cupom";
import Item from "../src/dominio/entidade/item";
import CupomRepositoryMemory from "../src/infra/repository/memory/CupomRepositoryMemory";
import ItemRepositoryMemory from "../src/infra/repository/memory/ItemRepositoryMemory";
import PedidoRepositoryMemory from "../src/infra/repository/memory/PedidoRepositoryMemory";

test("Deve fazer o pedido sem usar cupom", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.salvar(new Item(1, "Guitarra", 1000));
	itemRepository.salvar(new Item(2, "Amplificador", 5000));
	itemRepository.salvar(new Item(3, "Cabo", 30));
	const pedidoRepository = new PedidoRepositoryMemory();
	const cupomRepository = new CupomRepositoryMemory();
	const checkout = new FinalizarCompra(itemRepository, pedidoRepository, cupomRepository);
	const input = {
		cpf: "317.153.361-86",
		pedidoItems: [
			{ idItem: 1, quantidade: 1 },
			{ idItem: 2, quantidade: 1 },
			{ idItem: 3, quantidade: 3 }
		]
	};
	await checkout.execute(input);
	const pedidoPorCpf = new ObtemPedidoPorCpf(pedidoRepository);
	const pedidos = await pedidoPorCpf.execute("317.153.361-86");
	expect(pedidos).toHaveLength(1);
	expect(pedidos[0].total).toBe(6090);
});


test("Deve fazer o pedido com cupom", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.salvar(new Item(1, "Guitarra", 1000));
	itemRepository.salvar(new Item(2, "Amplificador", 5000));
	itemRepository.salvar(new Item(3, "Cabo", 30));

	const pedidoRepository = new PedidoRepositoryMemory();

	const cupomRepository = new CupomRepositoryMemory();
	cupomRepository.salvar(new Cupom('VALE20', 20, new Date("2024-02-12T01:31:04.522Z")))

	const checkout = new FinalizarCompra(itemRepository, pedidoRepository, cupomRepository);
	const input = {
		cpf: "317.153.361-86",
		pedidoItems: [
			{ idItem: 1, quantidade: 1 },
			{ idItem: 2, quantidade: 1 },
			{ idItem: 3, quantidade: 3 }
		],
		cupom: 'VALE20'
	};
	await checkout.execute(input);
	const pedidoPorCpf = new ObtemPedidoPorCpf(pedidoRepository);
	const pedidos = await pedidoPorCpf.execute("317.153.361-86");
	expect(pedidos).toHaveLength(1);
	expect(pedidos[0].total).toBe(4872);
});

test("Deve fazer o pedido com cupom", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.salvar(new Item(1, "Guitarra", 1000));
	itemRepository.salvar(new Item(2, "Amplificador", 5000));
	itemRepository.salvar(new Item(3, "Cabo", 30));

	const pedidoRepository = new PedidoRepositoryMemory();

	const cupomRepository = new CupomRepositoryMemory();
	cupomRepository.salvar(new Cupom('VALE20', 20, new Date("2023-02-12T01:31:04.522Z")))

	const checkout = new FinalizarCompra(itemRepository, pedidoRepository, cupomRepository);
	const input = {
		cpf: "317.153.361-86",
		pedidoItems: [
			{ idItem: 1, quantidade: 1 },
			{ idItem: 2, quantidade: 1 },
			{ idItem: 3, quantidade: 3 }
		],
		cupom: 'VALE20',
		date: new Date("2023-02-15T01:31:04.522Z")
	};
	await checkout.execute(input);
	const pedidoPorCpf = new ObtemPedidoPorCpf(pedidoRepository);
	const pedidos = await pedidoPorCpf.execute("317.153.361-86");
	expect(pedidos).toHaveLength(1);
	expect(pedidos[0].total).toBe(4872);
});