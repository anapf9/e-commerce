import axios from "axios";

test("Deve testar o preview pela API", async function () {
	const input = {
		cpf: "317.153.361-86",
		itensDoPedido: [
			{
				idItem: 1,
				quantidade: 1
			},
			{
				idItem: 2,
				quantidade: 1
			},
			{
				idItem: 3,
				quantidade: 3
			}
		]
	}
	const response = await axios.post("http://localhost:3000/visualiza-carrinho", input);
	const preview = response.data;
	expect(preview.total).toBe(6090);
});
