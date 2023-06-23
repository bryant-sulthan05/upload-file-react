import { Sequelize } from "sequelize";

const db = new Sequelize('upload_react', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;