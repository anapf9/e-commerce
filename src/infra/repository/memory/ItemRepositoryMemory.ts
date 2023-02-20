import Item from "../../../dominio/entidade/item";
import ItemRepository from "../../../dominio/repositorio/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
	items: Item[];

	constructor () {
		this.items = [];
	}

	async obtemItem(idItem: number): Promise<Item> {
		const item = this.items.find(item => item.idItem === idItem);
		if (!item) throw new Error("Item não encontrado");
		return item;
	}

	async salvar(item: Item): Promise<void> {
		this.items.push(item);
	}
}