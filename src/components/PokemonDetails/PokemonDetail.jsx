import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css"
import NavBar from "../Navbar/NavBar";
import axios from "axios";

function PokemonDetail() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [evoChain, setEvoChain] = useState(null);

  const [evolutionChain, setEvolutionChain] = useState(null);


  const [selectedSprite, setSelectedSprite] = useState(null);

  const handleClick = (sprite) => {
    setSelectedSprite(sprite);
  };

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemon(response.data);
      setSelectedSprite(response.data.sprites.other.dream_world.front_default);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokemonSpecies = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
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
  }, [pokemonName]);

  useEffect(() => {
    fetchPokemonSpecies();
  }, [pokemon]);

  useEffect(() => {
    if (pokemonSpecies) {
      fetchPokemonEvolChain();
    }
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
        </section>
      </main>
      <section>
      </section>
      <section>
        {evoChain && (
          <pre style={{ color: "wheat" }}>
            {evoChain.chain.species && JSON.stringify(evoChain.chain.species, null, 2)}
            <hr></hr>
            {evoChain.chain.evolves_to.length > 0 && evoChain.chain.evolves_to[0].species && JSON.stringify(evoChain.chain.evolves_to[0].species, null, 2)}
            <hr></hr>
            {evoChain.chain.evolves_to.length > 0 && evoChain.chain.evolves_to[0].evolves_to.length > 0 && evoChain.chain.evolves_to[0].evolves_to[0].species && JSON.stringify(evoChain.chain.evolves_to[0].evolves_to[0].species, null, 2)}
          </pre>
        )}
      </section>
      <section>
        {evoChain && (
          <pre style={{ color: "red" }}>
            {JSON.stringify(evolutionChain, null, 2)}
          </pre>
        )}
      </section>


    </>
  );
}

export default PokemonDetail;
