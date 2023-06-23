const Cliente = require('../models/Cliente');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

    async login(req, res) {
        const { email, senhaHash } = req.body;
        const cliente = await Cliente.findOne({ 'email': email }).select('+senhaHash -imagemPerfil')
        
        console.log(cliente)
        if (!cliente) {
            return res.status(400).send({ error: 'Usuário não encontrado!' });
        }

        if (!await bcryptjs.compare(senhaHash, cliente.senhaHash)) {
            return res.status(400).send({ error: 'Senha inválida!' });
        }

        await auth.incluirToken(cliente);
        res.status(200).json(cliente);
    }

    async getAuth(req, res) {
        try {
            const user = await Cliente.findById(req.userId, { imagemPerfil: 0 })

            res.json(user)
        } catch (error) {
            console.error(error)

            res.status(500).json({ erro: error })
        }
    }
}

module.exports = new LoginController();