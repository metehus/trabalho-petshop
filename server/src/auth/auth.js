const jwt = require('jsonwebtoken');
const auth = require('./app.json');

const bcryptjs = require('bcryptjs');

async function incluirToken(clientes) {
  const token = await jwt.sign({ userId: clientes._id }, auth.appId, {
    expiresIn: 3600 // Expira em 3600 segundos ou 1 hora.
  });
  clientes.token = token;
  clientes.senhaHash = undefined;
}

async function gerarHash(usuario) {
  if (typeof usuario.senhaHash !== 'undefined') {
    const hash = await bcryptjs.hash(usuario.senhaHash, 10);
    usuario.senhaHash = hash;
  }
  return usuario;
}

function autorizar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'O token não foi enviado!' });
  }

  const partes = authHeader.split(' ');

  if (partes && partes.length !== 2) {
    return res.status(401).send({ error: 'Token incompleto!' });
  }

  const [tipo, token] = partes;

  if (!/^Bearer$/i.test(tipo)) {
    return res.status(401).send({ error: 'Token mal formado!' });
  }

  jwt.verify(token, auth.appId, (err, usuario) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido!' });
    }
    req.userId = usuario.userId;
    return next();
  });
}

module.exports = {
  gerarHash,
  incluirToken,
  autorizar
};