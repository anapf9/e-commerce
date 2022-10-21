import Coupon from "../src/cupom";
import Item from "../src/item";
import Order from "../src/order";

test("Não deve criar um pedido com CPF inválido", function () {
	expect(() => new Order("111.111.111-11")).toThrow(new Error("Cpf inválido"));
});

test("Deve criar um pedido sem itens", function () {
	const order = new Order("317.153.361-86");
	const total = order.obtemTotal();
	expect(total).toBe(0);
});

test("Deve criar um pedido com 3 itens", function () {
	const order = new Order("317.153.361-86");
	order.adicionaItem(new Item(1, "Guitarra", 1000), 1);
	order.adicionaItem(new Item(2, "Amplificador", 5000), 1);
	order.adicionaItem(new Item(3, "Cabo", 30), 3);
	const total = order.obtemTotal();
	expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
	const order = new Order("317.153.361-86");
	order.adicionaItem(new Item(1, "Guitarra", 1000), 1);
	order.adicionaItem(new Item(2, "Amplificador", 5000), 1);
	order.adicionaItem(new Item(3, "Cabo", 30), 3);
	order.adicionaCupom(new Coupon("VALE20", 20));
	const total = order.obtemTotal();
	expect(total).toBe(4872);
});
