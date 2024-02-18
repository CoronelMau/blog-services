import { Sequelize } from 'sequelize';

const db = new Sequelize('blog_app', 'mau_coronel', 'blogapp', {
  host: 'localhost',
  dialect: 'postgres',
});

export default db;
