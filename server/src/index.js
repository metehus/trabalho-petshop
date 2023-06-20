const express = require('express')
const cors = require('cors')
const categoriasRouter = require('./routes/categoria')
const produtosRouter = require('./routes/produtos')
const clientesRouter = require('./routes/clientes')

require('./database')

const app = express()

app.use(cors())
app.use(express.json());

app.use('/categorias', categoriasRouter)
app.use('/produtos', produtosRouter)
app.use('/clientes', clientesRouter)

app.listen(8080, () => {
  console.log('Servidor aberto na porta :8080')
})