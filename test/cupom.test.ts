import Cupom from '../src/dominio/entidade/cupom';

it("Não deve aplicar cupom de desconto expirado", () => {
	const dataExpirada = new Date(2019, 0, 26)
	expect(() => new Cupom("VALENADA", 20, dataExpirada).calculaDesconto(10, new Date(2023, 0, 26))).toThrow(new Error("Cupom Expirado"));
})
