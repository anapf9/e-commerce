import Cupom from "../../../../dominio/entidade/cupom";
import CupomRepository from "../../../../dominio/repositorio/cupom-repository";
import Connection from "../../../database/ConnectionInterface";

export default class CupomRepositoryDatabase implements CupomRepository {

	constructor (readonly connection: Connection) {
	}

	async obterCupom(codigo:string): Promise<Cupom> {
		const [cupom] = await this.connection.query("select * from item where id_item = $1", [codigo]);
		return new Cupom(cupom.codigo, cupom.porcentagem, new Date );
	}

	salvar(codigo: Cupom): Promise<void> {
		throw new Error("Method not implemented.");
	}

}