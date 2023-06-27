import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css"
import NavBar from "./NavBar";

function PokemonDetail() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, [pokemonName]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  console.log(pokemon);

  const handleObjectClick = (objectKey) => {
    setSelectedObject(objectKey);
  };

  const handleClearObject = () => {
    setSelectedObject(null);
  };

  const tableRows = Object.entries(pokemon).map(([key, value]) => {
    if (typeof value === "object") {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <button onClick={() => handleObjectClick(key)}>View</button>
          </td>
        </tr>
      );
    }
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    );
  });

  let nestedObjectTable = null;
  if (selectedObject) {
    const nestedObject = pokemon[selectedObject];
    const nestedObjectRows = Object.entries(nestedObject).map(
      ([key, value]) => {
        if (typeof value === "object") {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <button
                  onClick={() => handleObjectClick(`${selectedObject}.${key}`)}
                >
                  View
                </button>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        }
      }
    );
    nestedObjectTable = (
      <div>
        <h2>{selectedObject}</h2>
        <button onClick={handleClearObject}>Close</button>
        <table>
          <tbody>{nestedObjectRows}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <NavBar></NavBar>
      <main className="pd-container">
        <section className="p-preview">
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </section>
        <section className="pd-details">
          <table>
            <tbody>{tableRows}</tbody>
          </table>
          {nestedObjectTable && [nestedObjectTable]}
        </section>
      </main>
    </>
  );
}

export default PokemonDetail;
