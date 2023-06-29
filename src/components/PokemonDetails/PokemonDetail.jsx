import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css"
import NavBar from "../Navbar/NavBar";
import axios from "axios";

function PokemonDetail() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemon(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pokemonName]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  console.log(pokemon);
  console.log("pokemon sprite");
  console.log(pokemon.sprites);


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
          <div className="poke-sprites">
            <div className="main-sprites">
              <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
              {/* <img src={pokemon.sprites.front_default} alt={pokemon.name} /> */}
            </div>
            <div className="sub-sprites">
              <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites.back_default} alt={pokemon.name} />
              {/* <img src={pokemon.sprites.front_female} alt={pokemon.name} /> */}
              {/* <img src={pokemon.sprites.back_female} alt={pokemon.name} /> */}
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
              <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
              {/* <img src={pokemon.sprites.front_shiny_female} alt={pokemon.name} /> */}
              {/* <img src={pokemon.sprites.back_shiny_female} alt={pokemon.name} /> */}
            </div>
          </div>
        </section>
        <section className="pd-details">
          <table>
            <tbody>{tableRows}</tbody>
          </table>
          {nestedObjectTable && [nestedObjectTable]}
        </section>
      </main>
      <section>
        {/* {pokemon.sprites.map((spriteUrl, index) => (
          <img key={index} src={spriteUrl} alt={`Sprite ${index}`} />
        ))} */}
      </section>
    </>
  );
}

export default PokemonDetail;
