const Database = require("../database");
const database = new Database();
const AtividadeModel = require("./AtividadeModel");

class CriarAtivSustModel {
    // Atributos privados (prefixados com #) para encapsulamento
    #id;
    #nome;
    #cpf;
    #contato;
    #endereco;
    #bairro;
    #numero;
    #tipoAtividade;
    #data;
    #horaInicial;
    #horaFinal;
    #descricao;

    constructor(id = 0, nome = "", cpf = "", contato = "", endereco = "", bairro = "", numero = "", tipoAtividadeId = null, data = null, horaInicial = null, horaFinal = null, descricao = "") {
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#contato = contato;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#numero = numero;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#descricao = descricao;

        // Carrega o tipo de atividade associado, se o ID for fornecido
        if (tipoAtividadeId) {
            this.#tipoAtividade = new AtividadeModel();
            this.#tipoAtividade.id = tipoAtividadeId; // Inicializa com o ID fornecido
        }
    }

    // Getters e Setters para cada atributo
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get contato() {
        return this.#contato;
    }

    set contato(novoContato) {
        this.#contato = novoContato;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get numero() {
        return this.#numero;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get tipoAtividade() {
        return this.#tipoAtividade;
    }

    set tipoAtividade(tipoAtividade) {
        if (tipoAtividade instanceof AtividadeModel) {
            this.#tipoAtividade = tipoAtividade;
        } else {
            throw new Error("Tipo de Atividade deve ser uma instância de AtividadeModel.");
        }
    }

    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    get horaInicial() {
        return this.#horaInicial;
    }

    set horaInicial(novaHoraInicial) {
        this.#horaInicial = novaHoraInicial;
    }

    get horaFinal() {
        return this.#horaFinal;
    }

    set horaFinal(novaHoraFinal) {
        this.#horaFinal = novaHoraFinal;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    // Método toJSON para conversão dos dados em um formato serializável
    toJSON() {
        return {
            criar_nome: this.#nome,
            criar_cpf: this.#cpf,
            criar_contato: this.#contato,
            criar_endereco: this.#endereco,
            criar_bairro: this.#bairro,
            criar_numero: this.#numero,
            id: this.#tipoAtividade ? this.#tipoAtividade.id : null, // Correspondência para o campo 'id' na tabela
            criar_data: this.#data,
            criar_horarioInicial: this.#horaInicial,
            criar_horarioFinal: this.#horaFinal,
            criar_descricao: this.#descricao,
        };
    }

    // Métodos de CRUD usando database
    async obterTodos() {
        const listaAtivSust = await database.ExecutaComando(`
            SELECT 
                criarativsust.criar_id,
                criarativsust.criar_nome,
                criarativsust.criar_cpf,
                criarativsust.criar_contato,
                criarativsust.criar_data,
                cadtipoativsust.nome AS tipo_atividade
            FROM 
                criarativsust
            JOIN 
                cadtipoativsust ON criarativsust.id = cadtipoativsust.id
            ORDER BY 
                criarativsust.criar_nome ASC
        `);
        return listaAtivSust;
    }

    async obterTiposAtividades() {
        const tiposAtividades = await database.ExecutaComando('SELECT * FROM cadtipoativsust ORDER BY nome ASC');
        return tiposAtividades;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('SELECT * FROM criarativsust WHERE criar_id = ?', [id]);
        return result[0];
    }

    async adicionar() {
        const dadosAtividade = this.toJSON();
        const query = `
            INSERT INTO criarativsust (
                criar_nome, criar_cpf, criar_contato, criar_endereco, criar_bairro, 
                criar_numero, id, criar_data, criar_horarioInicial, criar_horarioFinal, criar_descricao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            dadosAtividade.criar_nome, dadosAtividade.criar_cpf, dadosAtividade.criar_contato, dadosAtividade.criar_endereco,
            dadosAtividade.criar_bairro, dadosAtividade.criar_numero, dadosAtividade.id,
            dadosAtividade.criar_data, dadosAtividade.criar_horarioInicial, dadosAtividade.criar_horarioFinal,
            dadosAtividade.criar_descricao
        ];
        await database.ExecutaComandoNonQuery(query, valores);
    }

    async atualizar() {
        const dadosAtividade = this.toJSON();
        const query = `
            UPDATE criarativsust SET 
                criar_nome = ?, criar_cpf = ?, criar_contato = ?, criar_endereco = ?, criar_bairro = ?, 
                criar_numero = ?, id = ?, criar_data = ?, criar_horarioInicial = ?, criar_horarioFinal = ?, criar_descricao = ?
            WHERE criar_id = ?
        `;
        const valores = [
            dadosAtividade.criar_nome, dadosAtividade.criar_cpf, dadosAtividade.criar_contato, dadosAtividade.criar_endereco,
            dadosAtividade.criar_bairro, dadosAtividade.criar_numero, dadosAtividade.id,
            dadosAtividade.criar_data, dadosAtividade.criar_horarioInicial, dadosAtividade.criar_horarioFinal,
            dadosAtividade.criar_descricao, this.#id // Certifique-se de que o ID está definido
        ];
        await database.ExecutaComandoNonQuery(query, valores);
    }

    async excluir() {
        await database.ExecutaComandoNonQuery('DELETE FROM criarativsust WHERE criar_id = ?', [this.#id]);
    }

    async filtrar(termoBusca) {
        const atividadesSust = await database.ExecutaComando('SELECT * FROM criarativsust WHERE criar_nome LIKE ?', [`%${termoBusca}%`]);
        return atividadesSust;
    }
}

module.exports = CriarAtivSustModel;