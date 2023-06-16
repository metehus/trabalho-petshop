const mongoose = require('mongoose');
const Categoria = require('./Categoria');

module.exports = mongoose.model('Produtos', {
    nome: String,
    imagem: Buffer,
    descricao: String,
    preco: Number,
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorias'
    },
    animal: String,
    comentarios: [
        {
            texto: String,
            nota: Number
        }
    ]
});