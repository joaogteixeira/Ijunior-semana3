"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvRepository = void 0;
const Estoque_1 = require("../models/Estoque");
const Item_1 = require("../models/Item");
const fs = __importStar(require("fs"));
const csv = __importStar(require("fast-csv"));
const path_1 = __importDefault(require("path"));
class CsvRepository {
    constructor() {
        this.caminhoArquivo = path_1.default.join(__dirname, '../../data/estoque.csv');
        this.inicializarArquivo();
    }
    inicializarArquivo() {
        if (!fs.existsSync(this.caminhoArquivo)) {
            fs.writeFileSync(this.caminhoArquivo, 'nome,peso,valor,quantidade,ativo\n');
        }
    }
    async carregar() {
        const estoque = new Estoque_1.Estoque();
        await new Promise((resolve, reject) => {
            fs.createReadStream(this.caminhoArquivo)
                .pipe(csv.parse({ headers: true }))
                .on('data', (row) => {
                estoque.adicionarItem(new Item_1.Item(row.nome, parseFloat(row.peso), parseFloat(row.valor), parseInt(row.quantidade), row.ativo === 'true'));
            })
                .on('end', resolve)
                .on('error', reject);
        });
        return estoque;
    }
    async salvar(estoque) {
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
exports.CsvRepository = CsvRepository;
