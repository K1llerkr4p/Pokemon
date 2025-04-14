import { useEffect, useState } from "react";
import { getPokemons } from "../services/pokeService";
import { Table, Button } from "react-bootstrap";

const PokemonTable = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons().then(data => {
      setPokemons(data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">Lista de Pokémons</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((poke, idx) => (
            <tr key={poke.name}>
              <td>{idx + 1}</td>
              <td className="capitalize">{poke.name}</td>
              <td>
                <Button variant="info" size="sm">Ver</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PokemonTable;
