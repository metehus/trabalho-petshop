const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

module.exports = mongoose.model('Clientes', {
    codigo: Number,
    nome: 
    {
        type: String,
        required: true
    }
    ,imagemPerfil: 
    {
        type: Buffer,
        required: true
    }
    ,endereco: 
    {
        type: String,
        required: true
    }
    ,telefone: 
    {
        type: String,
        required: true
    }
    ,cpf: 
    {
        type: String,
        required: true
    }
    ,email: 
    {
        type: String,
        required: true
    }
    ,senhaHash: 
    {
        type: String,
        required: true,
        select: false
    }
    ,token: 
    {
        type: String,
        select: false
    }
    ,cartaoDeCredito: 
    {
        nome: 
        {
            type: String,
            required: true
        }
        ,numero:
        {
            type: String,
            required: true,
            select: false
        }
        ,cvc: 
        {
            type: String,
            required: true,
            select: false
        }
    }
})