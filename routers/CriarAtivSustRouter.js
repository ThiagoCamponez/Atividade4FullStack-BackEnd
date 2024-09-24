const CriarAtivSustController = require('../controller/CriarAtivSustController');
const criarAtivSustController = new CriarAtivSustController(); // Cria uma instância do controlador
const express = require('express');
const router = express.Router();

// Define as rotas e associa com os métodos do controller
router.get('/criarativsust', criarAtivSustController.obterTodos.bind(criarAtivSustController));
router.get('/criarativsust/:criar_id', criarAtivSustController.obterPorId.bind(criarAtivSustController));
router.post('/criarativsust', criarAtivSustController.adicionar.bind(criarAtivSustController));
router.put('/criarativsust/:criar_id', criarAtivSustController.atualizar.bind(criarAtivSustController));
router.delete('/criarativsust/:id', criarAtivSustController.excluir.bind(criarAtivSustController));
router.get('/criarativsust/filtrar/:termoBusca', criarAtivSustController.filtrar.bind(criarAtivSustController));

module.exports = router;
