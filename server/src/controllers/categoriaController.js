const Categoria = require('../models/Categoria')

module.exports = {
  async listAll(req, res) {
    try {
      const list = await Categoria.find({})
      res.json(list)
    } catch (error) {
      res.status(500).json({ erro: 'Não foi possível listar as categorias.' })
    }
  },

  async get(req, res) {
    try {
      const item = await Categoria.find({ _id: req.params.id })
      res.json(item)
    } catch (error) {
      res.status(500).json({ erro: 'Não foi possível listar essa categoria.' })
    }
  },

  async post(req, res) {
    try {
      if (!req.body.nome || !req.body.descricao) {
        return  res.status(400).json({ erro: 'Alguns dados estão faltando.' })
      }
      const newCategoria = await Categoria.create({
        nome: req.body.nome,
        descricao: req.body.descricao
      })
      res.json(newCategoria)
    } catch (error) {
      res.status(500).json({ erro: 'Não foi possível cadastrar a categoria.' })
    }
  },

  async update(req, res) {
    try {
        const id = req.params.id;
        const atualizado = await Categoria.findByIdAndUpdate(id, req.body);
        res.status(200).json({ mensagem: 'Categoria atualizada!' });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível atualizar a categoria.' })
    }
}
}