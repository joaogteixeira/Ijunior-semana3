import { Estoque } from "../models/Estoque";
import { Item } from "../models/Item";
import { CsvRepository } from "../repositories/CsvRepository";

export class EstoqueService {
    private estoque: Estoque;
    private repository: CsvRepository;

    constructor() {
        this.repository = new CsvRepository();
        this.estoque = new Estoque();
        this.inicializar();
    }

    private async inicializar(): Promise<void> {
        try {
            this.estoque = await this.repository.carregar();
        } catch (error) {
            console.log("Criando novo estoque...");
            this.estoque = new Estoque();
        }
    }

    public async adicionarItem(
        nome: string,
        pesoStr: string,
        valorStr: string,
        quantidadeStr: string
    ): Promise<string> {
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

        const novoItem = new Item(nome, peso, valor, quantidade);
        this.estoque.adicionarItem(novoItem);

        try {
            await this.repository.salvar(this.estoque);
            return `Item '${nome}' adicionado com sucesso!`;
        } catch (error) {
            return "Erro ao salvar no arquivo CSV.";
        }
    }

    public async removerItem(nome: string): Promise<string> {
        if (!this.estoque.itemExiste(nome)) {
            return `Erro: Item '${nome}' não encontrado.`;
        }

        this.estoque.removerItem(nome);

        try {
            await this.repository.salvar(this.estoque);
            return `Item '${nome}' removido com sucesso!`;
        } catch (error) {
            return "Erro ao salvar no arquivo CSV.";
        }
    }

    public listarItens(): Item[] {
        return this.estoque.listarItens();
    }

    public calcularValorTotal(): number {
        return this.estoque.listarItens()
            .reduce((total, item) => total + item.valorTotal(), 0);
    }

    public calcularPesoTotal(): number {
        return this.estoque.listarItens()
            .reduce((total, item) => total + (item.peso * item.quantidade), 0);
    }
}