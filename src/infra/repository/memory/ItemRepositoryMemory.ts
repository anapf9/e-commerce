import Item from "../../../dominio/entidade/item";
import ItemRepository from "../../../dominio/repositorio/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
	items: Item[];

	constructor () {
		this.items = [{
			idItem: 1,
			descricao: 'a',
			preco: 10
		},
		{
			idItem: 2,
			descricao: 'b',
			preco: 20
		},
		{
			idItem: 3,
			descricao: 'c',
			preco: 30
		}];
	}

	async obtemItem(idItem: number): Promise<Item> {
		console.log('this.items', idItem);
		console.log('this.items', this.items);
		
		const item = this.items.find(item => item.idItem === idItem);
		if (!item) throw new Error("Item não encontrado");
		return item;
	}

	async salvar(item: Item): Promise<void> {
		this.items.push(item);
	}
}