import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getOrCreateUser } from './database.js';

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

app.post('/api/user', async (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'Address required' });
  }
  try {
    const user = await getOrCreateUser(address);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.post('/api/update-stats', async (req,res) => {})


app.listen(port, () => {
  console.log('СЛУШАЮ ЁБАНА!')
});