const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const clienteSchema = new mongoose.Schema({
    codigo: Number,
    nome: 
    {
        type: String,
        required: true
    }
    ,imagemPerfil: 
    {
        type: Buffer,
        required: true,
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

});

clienteSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.senhaHash, 10);
    this.senhaHash = hash;
    next();
  });

  module.exports = mongoose.model('Clientes', clienteSchema);