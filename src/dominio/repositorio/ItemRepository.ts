import Item from "../entidade/item";

export default interface ItemRepository {
	obtemItem (idItem: number): Promise<Item>;
	salvar (item: Item): Promise<void>;
}