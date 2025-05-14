import express from 'express'
import  { registrarUsuario, autenticarUsuario } from '../controllers/usuario.js'
const router = express.Router()

router.post('/usuario', registrarUsuario)
router.post('/login', autenticarUsuario)

export { router }