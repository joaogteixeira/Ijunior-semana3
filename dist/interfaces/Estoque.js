"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
const Item_1 = require("./Item");
class Estoque {
    constructor() {
        this.itens = [];
    }
    adicionarItem(item) {
        this.itens.push(item);
    }
    removerItem(nome) {
        const index = this.itens.findIndex(item => item.nome === nome);
        if (index !== -1) {
            this.itens[index] = new Item_1.Item(this.itens[index].nome, this.itens[index].peso, this.itens[index].valor, this.itens[index].quantidade, false);
        }
    }
    itemExiste(nome) {
        return this.itens.some(item => item.nome === nome && item.ativo);
    }
    listarItensAtivos() {
        return this.itens.filter(item => item.ativo);
    }
    listarTodosItens() {
        return [...this.itens];
    }
}
exports.Estoque = Estoque;
