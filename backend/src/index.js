
import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import connectDB from './db/index.js';
import dotenv from "dotenv";
import connectToSocket from './controllers/socketManger.js';
dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.set("port", process.env.PORT || 3000);

const server = createServer(app);
const io = connectToSocket(server);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(app.get("port"), () => {
  connectDB();
  console.log('listening on *:3000');
});