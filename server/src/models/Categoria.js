const mongoose = require('mongoose')

module.exports = mongoose.model('Categorias', {
    nome: String,
    descricao: String
})