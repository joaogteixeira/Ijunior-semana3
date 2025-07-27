"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../models/Estoque");
const Item_1 = require("../models/Item");
const CsvRepository_1 = require("../repositories/CsvRepository");
class EstoqueService {
    constructor() {
        this.repository = new CsvRepository_1.CsvRepository();
        this.estoque = new Estoque_1.Estoque();
        this.inicializar();
    }
    async inicializar() {
        try {
            this.estoque = await this.repository.carregar();
        }
        catch (error) {
            console.log("Criando novo estoque...");
            this.estoque = new Estoque_1.Estoque();
        }
    }
    async adicionarItem(nome, pesoStr, valorStr, quantidadeStr) {
        // Validação dos dados
        const peso = parseFloat(pesoStr.replace(',', '.'));
        const valor = parseFloat(valorStr.replace(',', '.'));
        const quantidade = parseInt(quantidadeStr);
        if (isNaN(peso) || isNaN(valor) || isNaN(quantidade)) {
            return "Dados inválidos! Use números para peso, valor e quantidade.";
        }
        if (this.estoque.itemExiste(nome)) {
            return `Erro: O item '${nome}' já existe no estoque.`;
        }
        const novoItem = new Item_1.Item(nome, peso, valor, quantidade);
        this.estoque.adicionarItem(novoItem);
        try {
            await this.repository.salvar(this.estoque);
            return `Item '${nome}' adicionado com sucesso!`;
        }
        catch (error) {
            return "Erro ao salvar no arquivo CSV.";
        }
    }
    async removerItem(nome) {
        if (!this.estoque.itemExiste(nome)) {
            return `Erro: Item '${nome}' não encontrado.`;
        }
        this.estoque.removerItem(nome);
        try {
            await this.repository.salvar(this.estoque);
            return `Item '${nome}' removido com sucesso!`;
        }
        catch (error) {
            return "Erro ao salvar no arquivo CSV.";
        }
    }
    listarItens() {
        return this.estoque.listarItens();
    }
    calcularValorTotal() {
        return this.estoque.listarItens()
            .reduce((total, item) => total + item.valorTotal(), 0);
    }
    calcularPesoTotal() {
        return this.estoque.listarItens()
            .reduce((total, item) => total + (item.peso * item.quantidade), 0);
    }
}
exports.EstoqueService = EstoqueService;
