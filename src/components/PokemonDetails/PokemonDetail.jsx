import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css"
import NavBar from "../Navbar/NavBar";
import axios from "axios";
import pokemonDAO from "../../DAO/pokemonDAO";
import { wait } from "@testing-library/user-event/dist/utils";

function PokemonDetail() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [evoChain, setEvoChain] = useState(null);

  const [selectedSprite, setSelectedSprite] = useState(null);

  const handleClick = (sprite) => {
    setSelectedSprite(sprite);
  };

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokemonSpecies = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
      console.log(response.data);
      setPokemonSpecies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokemonEvolChain = async () => {
    try {
      const response = await axios.get(pokemonSpecies.evolution_chain.url);
      setEvoChain(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
    fetchPokemonSpecies();
    fetchPokemonEvolChain();
  }, [pokemonName]);

  useEffect(() => {
    console.log("pokemonSpecies");
    console.log(pokemonSpecies);
  }, [pokemonSpecies]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

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
              <img src={selectedSprite} alt={pokemon.name} />
            </div>
            <div className="sub-sprites">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
                onClick={() => handleClick(pokemon.sprites.other.dream_world.front_default)}
              />
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                onClick={() => handleClick(pokemon.sprites.front_default)}
              />
              <img
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                onClick={() => handleClick(pokemon.sprites.back_default)}
              />
              <img
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                onClick={() => handleClick(pokemon.sprites.front_shiny)}
              />
              <img
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                onClick={() => handleClick(pokemon.sprites.back_shiny)}
              />
            </div>
          </div>
        </section>
        <section className="pd-details">
          <table>
            <tbody>{tableRows}</tbody>
          </table>
          {nestedObjectTable && [nestedObjectTable]}
          <section>
            test 1 |
            {pokemonName}
            | test 3
            {/* <p><a style={{ color: "red" }}>{pokemonSpecies.evolution_chain.url}</a></p> */}
            <pre style={{ color: "wheat" }}>{JSON.stringify(pokemon, null, 2)}</pre>
            <pre style={{ color: "wheat" }}>{JSON.stringify(evoChain, null, 2)}</pre>
          </section>
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
