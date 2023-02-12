import Item from "../../../../dominio/entidade/item";
import ItemRepository from "../../../../dominio/repositorio/ItemRepository";
import Connection from "../../../database/ConnectionInterface";

export default class ItemRepositoryDatabase implements ItemRepository {

	constructor (readonly connection: Connection) {
	}

	async obtemItem(idItem: number): Promise<Item> {
		const [itemData] = await this.connection.query("select * from item where id_item = $1", [idItem]);
		return new Item(itemData.id_item, itemData.descricao, parseFloat(itemData.preco));
	}

	salvar(item: Item): Promise<void> {
		throw new Error("Method not implemented.");
	}

}