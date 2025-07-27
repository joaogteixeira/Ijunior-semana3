export class Item {
    constructor(
        public nome: string,
        public peso: number,
        public valor: number,
        public quantidade: number,
        public ativo: boolean = true
    ) {}

    valorTotal(): number {
        return this.valor * this.quantidade;
    }
}