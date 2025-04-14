import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokemonTable from "./componentes/pokemonTable";

function App() {
  return (
    <div className="container mt-4">
      <PokemonTable />
    </div>
  );
}

export default App
