const Cliente = require('../models/Cliente');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

    async login(req, res) {
        const { email, senhaHash } = req.body;
        const cliente = await Cliente.findOne({ 'email': email }).select('+senhaHash')
        
        if (!cliente) {
            return res.status(400).send({ error: 'Usuário não encontrado!' });
        }

        if (!await bcryptjs.compare(senha, cliente.senhaHash)) {
            return res.status(400).send({ error: 'Senha inválida!' });
        }

        await auth.incluirToken(cliente);
        res.status(200).json(cliente);
    }
}

module.exports = new LoginController();