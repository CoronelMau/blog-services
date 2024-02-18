import express from 'express';
import cors from 'cors';

import db from '../db/connection.js';
import router from '../routes/user.routes.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.dbConnection();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/user', router);
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (err) {
      console.error(err);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening in port ${this.port}`);
    });
  }
}
