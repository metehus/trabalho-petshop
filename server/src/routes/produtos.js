const express = require('express')
const produtoController = require('../controllers/produtoController')

module.exports = podutosRouter = express.Router()

podutosRouter.get('/', produtoController.listAll)
podutosRouter.post('/', produtoController.post)
podutosRouter.get('/:id', produtoController.get)
podutosRouter.put('/:id', produtoController.update)

podutosRouter.put('/:id/imagem', express.raw({ limit: '5mb' }), produtoController.updateImage)
podutosRouter.get('/:id/imagem', produtoController.getImage)
