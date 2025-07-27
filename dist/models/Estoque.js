"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    constructor() {
        this.itens = [];
    }
    adicionarItem(item) {
        this.itens.push(item);
    }
    removerItem(nome) {
        const item = this.itens.find(i => i.nome === nome);
        if (item)
            item.ativo = false;
    }
    itemExiste(nome) {
        return this.itens.some(i => i.nome === nome && i.ativo);
    }
    listarItens() {
        return this.itens.filter(i => i.ativo);
    }
}
exports.Estoque = Estoque;
