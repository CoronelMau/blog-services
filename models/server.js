import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import db from '../db/connection.js';
import router from '../routes/user.routes.js';
import socketEvents from '../controllers/socket.controller.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.dbConnection();

    this.middlewares();
    this.routes();

    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server);
    socketEvents(this.io);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(
      express.json({
        limit: '50mb',
      })
    );
  }

  routes() {
    this.app.use('/user', router);
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (err) {
      console.log('Cannot connect');
      console.error(err);
    }
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Listening in port ${this.port}`);
    });
  }
}
