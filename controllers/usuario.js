import { Usuario } from "../models/Usuario.js"
import jwt from 'jsonwebtoken'

const segredoJwt = process.env.SEGREDO_JWT

const registrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body
        if (!nome || !email || !senha) {
            return res.status(400).send({ mensagem: 'Dados incompletos' })
        }
        const usuarioExistente = await Usuario.findOne({ where: { email } })
        if (usuarioExistente) {
            return res.status(400).send({ mensagem: 'Usuário já existe' })
        }
        await Usuario.create({ nome, email, senha })
        res.status(201).send({ mensagem: 'Usuario foi criado' })
    } catch (erroDisparado) {
        console.log(erroDisparado)
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' })
    }
}

const autenticarUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body
        if (!email || !senha) {
            return res.status(400).send({ mensagem: 'Dados incompletos' })
        }
        const buscarUsuarioPorEmail = await Usuario.findOne({ where: { email } })
        if (!buscarUsuarioPorEmail) {
            return res.status(404).send({ mensagem: 'Usuário não encontrado' })
        }
        const senhaQueEstaNoBanco = buscarUsuarioPorEmail.senha
        const idUsuario = buscarUsuarioPorEmail.id
        if (senhaQueEstaNoBanco === senha) {

            const conteudoDoToken = { idUsuario }
 
            const token = jwt.sign(conteudoDoToken, segredoJwt, { expiresIn: '1d' })
            return res.status(201).send({ token })
        } else {

            return res.status(403).send({ mensagem: 'Credenciais inválidas' })
        }
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' })
    }
}

export { registrarUsuario, autenticarUsuario }