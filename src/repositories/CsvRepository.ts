import { Estoque } from "../models/Estoque";
import { Item } from "../models/Item";
import * as fs from 'fs';
import * as csv from 'fast-csv';
import path from 'path';

export class CsvRepository {
    private readonly caminhoArquivo: string;

    constructor() {
        this.caminhoArquivo = path.join(__dirname, '../../data/estoque.csv');
        this.inicializarArquivo();
    }

    private inicializarArquivo(): void {
        if (!fs.existsSync(this.caminhoArquivo)) {
            fs.writeFileSync(this.caminhoArquivo, 'nome,peso,valor,quantidade,ativo\n');
        }
    }

    async carregar(): Promise<Estoque> {
        const estoque = new Estoque();
        
        await new Promise((resolve, reject) => {
            fs.createReadStream(this.caminhoArquivo)
                .pipe(csv.parse({ headers: true }))
                .on('data', (row) => {
                    estoque.adicionarItem(new Item(
                        row.nome,
                        parseFloat(row.peso),
                        parseFloat(row.valor),
                        parseInt(row.quantidade),
                        row.ativo === 'true'
                    ));
                })
                .on('end', resolve)
                .on('error', reject);
        });

        return estoque;
    }

    async salvar(estoque: Estoque): Promise<void> {
        await new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(this.caminhoArquivo);
            stream.write('nome,peso,valor,quantidade,ativo\n');

            csv.writeToStream(stream, estoque.listarItens().map(item => ({
                nome: item.nome,
                peso: item.peso,
                valor: item.valor,
                quantidade: item.quantidade,
                ativo: item.ativo
            })), { headers: false })
                .on('finish', resolve)
                .on('error', reject);
        });
    }
}