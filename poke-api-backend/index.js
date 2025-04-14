const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const URL = 'https://pokeapi.co/api/v2';

app.get('/api/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  try {
    const response = await axios.get(`${URL}/${endpoint}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

const endpoints = [
  'pokemon',
  'move',
  'ability',
  'type',
  'egg-group',
  'version',
  'item',
  'pokedex',
  'evolution-chain',
];

endpoints.forEach(endpoint => {
  app.get(`/api/${endpoint}`, async (req, res) => {
    try {
      const response = await axios.get(`${URL}/${endpoint}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: `Error en /api/${endpoint}` });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
