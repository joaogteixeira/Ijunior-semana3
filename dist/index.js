"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EstoqueService_1 = require("./services/EstoqueService");
const InputHelper_1 = require("./utils/InputHelper");
const TableHelper_1 = require("./utils/TableHelper");
const estoqueService = new EstoqueService_1.EstoqueService();
const inputHelper = new InputHelper_1.InputHelper();
async function main() {
    console.log("=== Sistema de Estoque ===");
    while (true) {
        console.log("\n1. Adicionar Item");
        console.log("2. Remover Item");
        console.log("3. Listar Itens");
        console.log("4. Sair");
        const opcao = await inputHelper.pergunta("Escolha uma opção: ");
        switch (opcao) {
            case '1':
                await adicionarItem();
                break;
            case '2':
                await removerItem();
                break;
            case '3':
                listarItens();
                break;
            case '4':
                process.exit(0);
            default:
                console.log("Opção inválida!");
        }
    }
}
async function adicionarItem() {
    const nome = await inputHelper.pergunta("Nome do item: ");
    const peso = await inputHelper.pergunta("Peso (kg): ");
    const valor = await inputHelper.pergunta("Valor unitário: ");
    const quantidade = await inputHelper.pergunta("Quantidade: ");
    const resultado = await estoqueService.adicionarItem(nome, peso, valor, quantidade);
    console.log(resultado);
}
async function removerItem() {
    const nome = await inputHelper.pergunta("Nome do item a remover: ");
    const resultado = await estoqueService.removerItem(nome);
    console.log(resultado);
}
function listarItens() {
    const itens = estoqueService.listarItens();
    console.log(TableHelper_1.TableHelper.formatar(itens));
}
main().catch(console.error);
