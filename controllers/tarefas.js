import { Tarefa } from '../models/Tarefa.js'

const registrarTarefa = async (req, res) => {
    try {
        const id_usuario = req.id_usuario
        const { descricao } = req.body
        if(!descricao || !id_usuario) {
            res.status(400).send({ mensagem: 'Dados incompletos '})
        }

        await Tarefa.create({ descricao, id_usuario })
        res.status(201).send({ mensagem: 'Tarefa criada'})        
    } catch(err) {        
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado'})
    }
}

const listarTarefa = async (req, res) => {    
    try {

        const id_usuario = req.id_usuario
        const tarefas = await Tarefa.findAll({ where: { id_usuario }})
        res.status(200).send({ tarefas })
    } catch (err) {
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado'})
    }
}

const excluirTarefa = async (req, res) => {
    try {
        const id_usuario = req.id_usuario
        const { id } = req.params
        const tarefa = await Tarefa.findByPk(id)
        if(tarefa.id_usuario === id_usuario){
            await Tarefa.destroy({ where: { id, id_usuario }})
            res.status(200).send({ mensagem: 'Tarefa excluida com sucesso'})
        } else {
            res.status(404).send({ mensagem: 'Essa tarefa pertence a outro usuario'})
        }
    } catch (err) {
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado'})
    }
}
const atualizarTarefa = async (req, res) => {
    try {
        const id_usuario = req.id_usuario
        const { id } = req.params
        const { descricao } = req.body

        if (!descricao) {
            return res.status(400).send({ mensagem: 'Descrição obrigatória' })
        }

        const tarefa = await Tarefa.findByPk(id)

        if (!tarefa) {
            return res.status(404).send({ mensagem: 'Tarefa não encontrada' })
        }

        if (tarefa.id_usuario !== id_usuario) {
            return res.status(403).send({ mensagem: 'Você não tem permissão para editar esta tarefa' })
        }

        tarefa.descricao = descricao
        await tarefa.save()

        res.status(200).send({ mensagem: 'Tarefa atualizada com sucesso' })
    } catch (err) {
        res.status(500).send({ mensagem: 'Erro ao atualizar a tarefa' })
    }
}


export { registrarTarefa, listarTarefa, excluirTarefa, atualizarTarefa }