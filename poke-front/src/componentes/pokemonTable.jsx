import { useEffect, useState } from "react";
import { getPokemons } from "../services/pokeService";
import { Table, Button, Form, Modal, Toast, ToastContainer } from "react-bootstrap";

const PokemonTable = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    getPokemons().then(data => {
      setPokemons(data);
    });
  }, []);

  const filteredPokemons = pokemons.filter(poke =>
    poke.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleShow = async (pokemon) => {
    try {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      setSelectedPokemon(data);
      setShowModal(true);
      setToastMsg(`Has seleccionado a ${data.name}`);
      setShowToast(true);
    } catch (error) {
      console.error("Error al cargar los datos del Pokémon", error);
    }
  };

  return (
    <div className="p-4 fade-in">
      <h2 className="text-center fw-bold mb-4">Pokédex</h2>

      <Form.Control
        type="text"
        placeholder="Search with name"
        className="mb-4 shadow-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Table striped bordered hover responsive className="shadow-sm text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemons.map((poke, idx) => (
            <tr key={poke.name} style={{ cursor: "pointer" }}>
              <td>{idx + 1}</td>
              <td className="text-capitalize">{poke.name}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleShow(poke)}>
                  See
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><strong>Information</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPokemon ? (
            <div className="text-center">
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                className="mb-3"
              />
              <h5 className="text-capitalize">{selectedPokemon.name}</h5>

              <p>
                <strong>Tips:</strong>{" "}
                {selectedPokemon.types.map((t) => t.type.name).join(", ")}
              </p>

              <p>
                <strong>Stats:</strong>
              </p>
              <ol className="list-unstyled">
                {selectedPokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ol>
              
              <p>
              	<strong> Shiny:</strong>
              	<img
              		src ={selectedPokemon.sprites.front_shiny}
              		alt ={`${selectedPokemon.name} shiny`}
              	 />
              </p>
              
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer className="position-fixed bottom-0 end-0 p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2500}
          autohide
          bg="warning"
        >
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default PokemonTable;

		
