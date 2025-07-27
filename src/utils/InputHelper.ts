import * as readline from 'readline';

export class InputHelper {
    private leitor: readline.Interface;

    constructor() {
        this.leitor = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    pergunta(pergunta: string): Promise<string> {
        return new Promise(resolve => {
            this.leitor.question(pergunta, resposta => {
                resolve(resposta);
            });
        });
    }
}