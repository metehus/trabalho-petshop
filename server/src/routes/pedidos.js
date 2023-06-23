const express = require('express')
const pedidoController = require('../controllers/pedidoController')
const { autorizar } = require('../auth/auth')

module.exports = pedidosRouter = express.Router()

pedidosRouter.get('/', autorizar, pedidoController.list)
pedidosRouter.post('/', autorizar, pedidoController.post)
pedidosRouter.put('/:id', autorizar, pedidoController.edit)