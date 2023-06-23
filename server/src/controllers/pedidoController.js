const Pedido = require("../models/Pedido")
const Produto = require("../models/Produto")

module.exports = {
  async post(req, res) {
    try {
      const produtos = await Produto.find({
        '_id': {
          '$in': req.body.produtos.map(p => p.id)
        }
      }, { imagem: 0 })

      const precoTotal = req.body.produtos.reduce((sum, c) => {
        const produto = produtos.find(p => p._id.toString() === c.id)
        return sum + (c.quantidade * produto.preco)
      }, 0)

      const pedido = await Pedido.create({
        precoTotal,
        produtos: req.body.produtos.map(p => ({
          produto: p.id,
          quantidade: p.quantidade
        })),
        cliente: req.userId,
        data: new Date(),
        status: 'AGUARDANDO_PAGAMENTO'
      })

      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível finalizar o pedido.' })
    }
  },

  async edit(req, res) {
    try {
      if (!req.body.status) {
        return res.status(400).json({ error: 'Status faltando no request' })
      }
      if (!['AGUARDANDO_PAGAMENTO','FATURADO', 'ENVIADO', 'CANCELADO'].includes(req.body.status)) {
        return res.status(400).json({ error: 'Status inválido' })
      }
      const pedidos = await Pedido.findByIdAndUpdate(req.params.id, { 
        status: req.body.status
       })

      res.json({
        mensagem: 'Pedido atualizado!'
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível editar o pedido.' })
    }
  },

  async list(req, res) {
    try {
      let query = undefined
      if (req.query.fromUser === 'true') {
        query = {
          cliente: req.userId
        }
      }
      const pedidos = await Pedido.find(query, { imagem: 0 }).populate('produtos.produto', '-__v -imagem -comentarios')

      res.json(pedidos)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível listar os pedidos.' })
    }
  }
}