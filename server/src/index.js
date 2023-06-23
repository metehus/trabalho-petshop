const express = require('express')
const cors = require('cors')
const categoriasRouter = require('./routes/categoria')
const produtosRouter = require('./routes/produtos')
const clientesRouter = require('./routes/clientes')
const loginRouter = require('./routes/login')
const pedidosRouter = require('./routes/pedidos')

require('./database')

const app = express()

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(cors())
app.use(express.json());

app.use('/categorias', categoriasRouter)
app.use('/produtos', produtosRouter)
app.use('/clientes', clientesRouter)
app.use('/auth', loginRouter);
app.use('/pedidos', pedidosRouter)

app.listen(8080, () => {
  console.log('Servidor aberto na porta :8080')
})