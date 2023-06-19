const clienteModel = require('../models/Cliente');
const auth = require('../auth/auth');

module.exports =  {
    async salvar(req, res) {
        const cliente = req.body;
        const max = await clienteModel.findOne({}).sort({ codigo: -1 });
        cliente.codigo = max == null ? 1 : max.codigo + 1;

        if (await clienteModel.findOne({ 'email': cliente.email })) {
            res.status(400).send({ error: 'Cliente já cadastrado!' });
        }
        const resultado = await clienteModel.create(cliente);
        auth.incluirToken(resultado);
        res.status(201).json(resultado);
    }

    ,async listar(req, res) {
        try
        {
        const resultado = await clienteModel.find({});
        res.status(200).json(resultado);
        }
        catch(error)
        {
            res.status(500).json({ erro: 'Não foi possível listar os clientes.' })
        }
    }

    ,async buscarPorCodigo(req, res) {
        try
        {
        const codigo = req.params.codigo;
        const resultado = await clienteModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
        }
        catch(error)
        {
            res.status(500).json({ erro: 'Não foi possível buscar por cliente.' })
        }
    }

    ,async atualizar(req, res) {
        try
        {
        const codigo = req.params.codigo;
        const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);
        const cliente = req.body;
        await clienteModel.findByIdAndUpdate(String(_id), cliente);
        res.status(200).send();
        }
        catch(error)
        {
            res.status(500).json({ erro: 'Não foi possível atualizar o cliente.' })
        }
    }

    ,async excluir(req, res) {
        try
        {
        const codigo = req.params.codigo;
        const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);
        await clienteModel.findByIdAndRemove(String(_id));
        res.status(200).send();
        }
        catch(error)
        {
            res.status(500).json({ erro: 'Não foi possível excluir o cliente.' })
        }
    }
}
