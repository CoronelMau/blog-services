import dotenv from 'dotenv';

import Server from './models/server.js';

dotenv.config();
console.clear();

const server = new Server();
server.listen();
