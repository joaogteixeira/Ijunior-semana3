import { Item } from "./Item";

export class Estoque {
    private itens: Item[] = [];

    adicionarItem(item: Item): void {
        this.itens.push(item);
    }

    removerItem(nome: string): void {
        const item = this.itens.find(i => i.nome === nome);
        if (item) item.ativo = false;
    }

    itemExiste(nome: string): boolean {
        return this.itens.some(i => i.nome === nome && i.ativo);
    }

    listarItens(): Item[] {
        return this.itens.filter(i => i.ativo);
    }
}