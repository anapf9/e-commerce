import VisualizaCarrinho from "../src/aplicacao/usecase/visualizar-carrinho";
import Cupom from "../src/dominio/entidade/cupom";
import Item from "../src/dominio/entidade/item";
import ItemRepository from "../src/dominio/repositorio/ItemRepository";
import CupomRepositoryMemory from "../src/infra/repository/memory/CupomRepositoryMemory";
import ItemRepositoryMemory from "../src/infra/repository/memory/ItemRepositoryMemory";

test("Deve simular um pedido sem desconto", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.salvar(new Item(1, "Guitarra", 1000));
	itemRepository.salvar(new Item(2, "Amplificador", 5000));
	itemRepository.salvar(new Item(3, "Cabo", 30));
	const cupomRepository = new CupomRepositoryMemory()
	const preview = new VisualizaCarrinho(itemRepository, cupomRepository);
	const input = {
		cpf: "317.153.361-86",
		itensDoPedido: [
			{ idItem: 1, quantidade: 1 },
			{ idItem: 2, quantidade: 1 },
			{ idItem: 3, quantidade: 3 }
		]
	};
	const total = await preview.execute(input);
	expect(total).toBe(6090);
});

test("Deve simular um pedido COM desconto", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.salvar(new Item(1, "Guitarra", 1000));
	itemRepository.salvar(new Item(2, "Amplificador", 5000));
	itemRepository.salvar(new Item(3, "Cabo", 30));
	const cupomRepository = new CupomRepositoryMemory()
	cupomRepository.salvar(new Cupom("VALE20", 20))
	const preview = new VisualizaCarrinho(itemRepository, cupomRepository);
	const input = {
		cpf: "317.153.361-86",
		itensDoPedido: [
			{ idItem: 1, quantidade: 1 },
			{ idItem: 2, quantidade: 1 },
			{ idItem: 3, quantidade: 3 }
		],
		cupom: 'VALE20'
	};
	const total = await preview.execute(input);
	expect(total).toBe(4872);
});