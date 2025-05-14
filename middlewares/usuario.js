import jwt from 'jsonwebtoken'
const segredoJwt = process.env.SEGREDO_JWT

const validarToken = (req, res, next) => {
    try {
        const { token } = req.headers
        if(!token) {
            return res.status(404).send({ mensagem: 'Acesso negado' })
        }
        const conteudoDoToken = jwt.verify(token, segredoJwt)

        const id_usuario = conteudoDoToken.idUsuario
 
        req.id_usuario = id_usuario
        next()
    } catch(erro){
        res.status(404).send({ mensagem: 'Acesso negado' })
    }    
}


export { validarToken }