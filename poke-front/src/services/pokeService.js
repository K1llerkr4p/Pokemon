import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export async function getPokemons() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await res.json();
  return data.results;
};
