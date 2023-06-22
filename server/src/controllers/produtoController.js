const Produto = require('../models/Produto')
const Categoria = require('../models/Categoria')

module.exports = {
  async listAll(req, res) {
    try {
      const list = await Categoria.aggregate([{
        "$lookup": {
            from: 'produtos',
            localField: '_id',
            foreignField: 'categoria',
            as: 'produtos'
        }
      }, {
        "$unset": ["produtos.imagem"]
      }])


      res.json({
        categorias: list.map(c => ({
          ...c,
          produtos: c.produtos.map(produto => ({
            ...produto,
            imagem: `/produtos/${produto._id}/imagem`
          }))
        }))
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível listar os produtos.' })
    }
  },

  async get(req, res) {
    try {
      const item = await Produto.findById(req.params.id, { imagem: 0 }).populate('categoria')

      const obj = item._doc

      obj.imagem = `/produtos/${obj._id}/imagem`

      res.json(obj)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível listar esse produto.' })
    }
  },

  async post(req, res) {
    try {
      if (!req.body.nome || !req.body.descricao || !req.body.preco || !req.body.categoria || !req.body.animal) {
        return  res.status(400).json({ erro: 'Alguns dados estão faltando.' })
      }

      const categoria = Categoria.findById(req.body.categoria)

      if (!categoria) {
        return  res.status(404).json({ erro: 'Categoria inexistente.' })
      }

      const produto = await Produto.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        imagem: req.body.imagem,
        categoria: req.body.categoria,
        animal: req.body.animal,
        comentarios: req.body.comentarios,
      })
      res.json(produto)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível cadastrar o produto: ' + error.toString() })
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const atualizado = await Produto.findByIdAndUpdate(id, req.body);
      res.status(200).json({ mensagem: 'Produto atualizado!' });
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível atualizar o produto.' })
    }
  },

  async updateImage(req, res) {
    try {
      const produto = await Produto.findById(req.params.id, {})

      produto.imagem = req.body
      await produto.save()

      res.json({
          mensagem: 'Imagem do produto atualizada'
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Não foi possível atualizar a imagem.' })
    }
  },

  async getImage(req, res) {
    try {
      const produto = await Produto.findById(req.params.id)

      if (!produto.imagem) {
        return res.status(404).json({
          erro: 'Esse produto não possuí imagem'
        })
      }

      res.contentType('image/jpeg').send(produto.imagem)
    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: 'Não foi possível retornar a imagem.' })
    }
  }
}