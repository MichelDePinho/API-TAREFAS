import { database } from "../database.js";
import { DataTypes } from "sequelize";

const Usuario = database.define('Usuario', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }, 
    nome: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    senha: {
        type: DataTypes.STRING
    }
})

export { Usuario}