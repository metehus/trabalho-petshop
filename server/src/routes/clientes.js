const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', clienteController.salvar);
router.get('/:id', clienteController.buscarPorCodigo);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.excluir);

router.put('/:id/imagem', express.raw({ limit: '5mb' }), clienteController.atualizarImage);
router.get('/:id/imagem', clienteController.mostrarImage);

module.exports = router;