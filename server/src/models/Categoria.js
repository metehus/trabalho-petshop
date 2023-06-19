const mongoose = require('mongoose')

module.exports = mongoose.model('Categorias', {

    nome: 
    {
        type: String,
        required: true
    }
    ,descricao: 
    {
        type: String,
        required: true
    }
})