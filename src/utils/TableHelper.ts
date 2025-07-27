import { Item } from "../models/Item";

export class TableHelper {
    static formatar(itens: Item[]): string {
        if (itens.length === 0) return "Nenhum item no estoque.";

        const cabecalho = "| Nome | Peso | Valor | Quantidade | Valor Total |";
        const linha = "-".repeat(cabecalho.length);

        const linhas = itens.map(item => {
            return `| ${item.nome.padEnd(10)} | ${item.peso.toFixed(2).padStart(5)} | ` +
                   `${item.valor.toFixed(2).padStart(5)} | ${item.quantidade.toString().padStart(5)} | ` +
                   `${item.valorTotal().toFixed(2).padStart(5)} |`;
        });

        return [linha, cabecalho, linha, ...linhas, linha].join('\n');
    }
}