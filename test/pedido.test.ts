import Cupom from "../src/dominio/entidade/cupom";
import Item from "../src/dominio/entidade/item";
import Pedido from "../src/dominio/entidade/pedido";

it("Não deve criar um pedido com CPF inválido", () => {
	expect(() => new Pedido("111.111.111-11")).toThrow(new Error("Cpf inválido"));
});

it("Deve criar um pedido sem itens", () => {
	const order = new Pedido("841.456.270-16");
	const total = order.obtemTotal();
	expect(total).toBe(0);
});

it("Deve criar um pedido com 3 itens", () => {
	const order = new Pedido("841.456.270-16");
	order.adicionaItem(new Item(1, "Guitarra", 1000), 1);
	order.adicionaItem(new Item(2, "Amplificador", 5000), 1);
	order.adicionaItem(new Item(3, "Cabo", 30), 3);
	const total = order.obtemTotal();
	expect(total).toBe(6090);
});

it("Deve criar um pedido com 3 itens com cupom de desconto", () => {
	const order = new Pedido("841.456.270-16");
	const data = new Date()
	order.adicionaItem(new Item(1, "Guitarra", 1000), 1);
	order.adicionaItem(new Item(2, "Amplificador", 5000), 1);
	order.adicionaItem(new Item(3, "Cabo", 30), 3);
	order.adicionaCupom(new Cupom("VALE20", 20));
	const total = order.obtemTotal();
	expect(total).toBe(4872);
});

fit("Ao fazer um pedido, a quantidade de um item não pode ser negativa", () => {
	const order = new Pedido("841.456.270-16");
	order.adicionaItem(new Item(1, "Guitarra", 1000), -1);
	expect(() => order).toThrow(new Error("A quantidade de items não pode ser negativa"));
});
