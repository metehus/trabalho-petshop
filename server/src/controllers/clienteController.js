const Cliente = require('../models/Cliente');
const auth = require('../auth/auth');

module.exports = {
    async salvar(req, res) {
        const cliente = req.body;
        const max = await Cliente.findOne({}).sort({ codigo: -1 });
        cliente.codigo = max == null ? 1 : max.codigo + 1;

        if (await Cliente.findOne({ 'email': cliente.email })) {
            res.status(400).send({ error: 'Cliente já cadastrado!' });
        }

        auth.gerarHash(cliente)

        const resultado = await Cliente.create(cliente);
        resultado.imagemPerfil = undefined
        resultado.senhaHash = undefined
        auth.incluirToken(resultado);
        res.status(201).json(resultado);
    }

    , async listar(req, res) {
        try {
            const resultado = await Cliente.find({}, { imagemPerfil: 0 });
            res.status(200).json(resultado);
        }
        catch (error) {
            res.status(500).json({ erro: 'Não foi possível listar os clientes.' })
        }
    }

    , async buscarPorCodigo(req, res) {
        try {
            const codigo = req.params.codigo;
            const resultado = await Cliente.findOne({ 'codigo': codigo }, { imagemPerfil: 0 });
            res.status(200).json(resultado);
        }
        catch (error) {
            res.status(500).json({ erro: 'Não foi possível buscar por cliente.' })
        }
    }

    , async atualizar(req, res) {
        try {
            const codigo = req.params.codigo;
            const _id = String((await Cliente.findOne({ 'codigo': codigo }))._id);
            const cliente = req.body;
            await Cliente.findByIdAndUpdate(String(_id), cliente);
            res.json({ mensagem: 'Atualizado!' });
        }
        catch (error) {
            res.status(500).json({ erro: 'Não foi possível atualizar o cliente.' })
        }
    }

    , async excluir(req, res) {
        try {
            const codigo = req.params.codigo;
            const _id = String((await Cliente.findOne({ 'codigo': codigo }))._id);
            await Cliente.findByIdAndRemove(String(_id));
            res.status(200).send();
        }
        catch (error) {
            res.status(500).json({ erro: 'Não foi possível excluir o cliente.' })
        }
    }

    ,async atualizarImage(req, res) {
        try {
          const cliente = await Cliente.findById(req.params.id, {})
    
          cliente.imagemPerfil = req.body
          await produto.save()
    
          res.json({
              mensagem: 'Imagem do produto atualizada'
          })
        } catch (error) {
          console.error(error)
          res.status(500).json({ erro: 'Não foi possível atualizar a imagem.' })
        }
      },
    
      async mostrarImage(req, res) {
        try {
          const cliente = await Cliente.findById(req.params.id)

          if (!cliente.imagemPerfil) {
            return res.status(404).json({
              erro: 'Esse produto não possuí imagem'
            })
          }
    
          res.contentType('image/jpeg').send(
            Buffer.from(cliente.imagemPerfil.toString().replace('data:image/jpeg;base64,', ''), 'base64')
          )
        } catch (error) {
            console.error(error)
            res.status(500).json({ erro: 'Não foi possível retornar a imagem.' })
        }
      }
}
