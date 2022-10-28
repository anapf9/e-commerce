export default class Item {
	/* altura: number = 0;
	lagura: number = 0;
	peso: number = 0;
	profundidade: number = 0; */
	
	constructor (
		readonly idItem: number, 
		readonly descricao: string, 
		readonly preco: number,  
		/* lagura: number, 
		profundidade: number,
		peso: number,
		altura: number */
		) {
			/*this.altura = altura
			this.lagura = lagura
			this.profundidade = profundidade
			this.peso = peso
			this.varolesFixos() */	}

	/* valoresFixos(): void {
		if (this.descricao === 'Camera') {
			this.altura = 20,
			this.lagura = 15,
			this.profundidade = 10,
			this.peso = 1,
		}
		if (this.descricao === 'Guitarra') {
			this.altura = 100,
			this.lagura = 30,
			this.profundidade = 10,
			this.peso = 3,
		}
		if (this.descricao === 'Geladeira') {
			this.altura = 200,
			this.lagura = 100,
			this.profundidade = 50,
			this.peso = 40,
		}
	} 

	calculaVolume() {
		return this.altura * this.lagura * this.profundidade
	}

	calculaDensidade() {
		return this.peso / this.calculaVolume()
	} */

	// pelo idItem consigo verificar no banco as informações de dimensão do produto
}
