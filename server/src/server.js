import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clientPath = join(__dirname, '..', '..', 'client');

const app = express();
const port = 3000;


app.use(cors({
    origin: 'http:46.72.32.89:3000', // URL фронтенда
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));
app.use(express.json());

app.use(express.static(clientPath));
app.get('/',(req,res) => {
  res.sendFile(path.join(clientPath, 'index.html'))
})

app.get('/', (req, res) => {
  res.send('Hello world!')
});


app.listen(port, () => {
  console.log('СЛУШАЮ ЁБАНА!')
});