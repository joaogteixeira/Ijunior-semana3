"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(nome, peso, valor, quantidade, ativo = true) {
        this.nome = nome;
        this.peso = peso;
        this.valor = valor;
        this.quantidade = quantidade;
        this.ativo = ativo;
    }
    valorTotal() {
        return this.valor * this.quantidade;
    }
}
exports.Item = Item;
