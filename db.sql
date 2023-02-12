CREATE TABLE item(
	id_item serial primary key,
	descricao text,
	preco numeric,
	largura int4,
	altura int4,
	tamanho int4,
	peso int4);

INSERT INTO item
(id_item, descricao, preco, largura, altura, tamanho, peso)
VALUES(1, 'Guitarra', 1000, 100, 30, 10, 3);
INSERT INTO item
(id_item, descricao, preco, largura, altura, tamanho, peso)
VALUES(2, 'Amplificador', 5000, 50, 50, 50, 20);
INSERT INTO item
(id_item, descricao, preco, largura, altura, tamanho, peso)
VALUES(3, 'Cabo', 30, 10, 10, 10, 1);
