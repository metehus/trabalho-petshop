const express = require('express')
const categoriaController = require('../controllers/categoriaController')

module.exports = categoriasRouter = express.Router()

categoriasRouter.get('/', categoriaController.listAll)
categoriasRouter.post('/', categoriaController.post)
categoriasRouter.get('/:id', categoriaController.get)
categoriasRouter.put('/:id', categoriaController.update)
