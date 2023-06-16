const mongoose = require('mongoose');
const Produto = require('./Produto');
const Cliente = require('./Cliente');

module.exports = mongoose.model('Pedidos', {
    precoTotal: Number,
    produtos: [
        {
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produtos'
            },
            quantidade: Number
        }
    ],
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clientes'
    },
    data: Date,
    status:  {
        type: String,
        enum : ['AGUARDANDO_PAGAMENTO','FATURADO', 'ENVIADO', 'CANCELADO'],
        default: 'AGUARDANDO_PAGAMENTO'
    },
});