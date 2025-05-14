import { database } from "../database.js";
import { DataTypes } from "sequelize";

const Tarefa = database.define('Tarefa', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }, 
    descricao: {
        type: DataTypes.STRING
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    completa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})

export { Tarefa }