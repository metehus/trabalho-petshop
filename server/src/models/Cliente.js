const mongoose = require('mongoose')

module.exports = mongoose.model('Clientes', {
    nome: String,
    imagemPerfil: Buffer,
    endereco: String,
    telefone: String,
    cpf: String,
    email: String,
    senhaHash: String,

    cartaoDeCredito: {
        nome: String,
        numero: String,
        cvc: String,
    }
});