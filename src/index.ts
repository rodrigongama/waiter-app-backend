import 'dotenv/config';
import path from 'node:path';
import http from 'node:http';

import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import cors from './app/middlewares/cors';
import errorHandler from './app/middlewares/errorHandler';

import { router } from './router';

const { DATABASE_URL } = process.env;

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(DATABASE_URL!)
  .then(() => {
    app.use(express.json());
    app.use(cors);
    app.use(router);
    app.use(errorHandler);
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    server.listen(3001, () =>
      console.log('Server is running at http://localhost:3001')
    );
  })
  .catch(() => console.log('Error connecting to MongoDB'));
