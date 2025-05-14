import express from 'express'
import { registrarTarefa, listarTarefa, excluirTarefa, atualizarTarefa } from '../controllers/tarefas.js'
import { validarToken } from '../middlewares/usuario.js'

const routerTarefa = express.Router()

routerTarefa.post('/tarefa', validarToken, registrarTarefa)
routerTarefa.get('/tarefa', validarToken, listarTarefa)
routerTarefa.delete('/tarefa/:id', validarToken, excluirTarefa)
routerTarefa.put('/tarefa/:id', validarToken, atualizarTarefa)

export { routerTarefa }