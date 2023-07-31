import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css"
import NavBar from "../Navbar/NavBar";
import axios from "axios";
import pokemonDAO from "../../DAO/pokemonDAO";

function PokemonDetail() {

  const [loadComplete, setLoadComplete] = useState(false);
  const [isPokemonDataFetched, setPokemonDataFetched] = useState(false);
  const [isPokemonSpeciesFetched, setPokemonSpeciesFetched] = useState(false);
  const [isEvoChainFetched, setEvoChainFetched] = useState(false);

  const navigate = useNavigate();
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [evoChain, setEvoChain] = useState(null);
  // const [evoList, setEvoList] = useState([]);

  const [speciesList, setSpeciesList] = useState([]);

  const [evolutionChain, setEvolutionChain] = useState(null);
  const [pokemonEvoDetails, setPokemonDetails] = useState([]);

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

      const traverseEvolutionChain = (evolution) => {
        if (evolution.species) {
          setSpeciesList((prevList) => [...prevList, evolution.species]);
        }

        if (evolution.evolves_to.length > 0) {
          evolution.evolves_to.forEach((nextEvolution) => {
            traverseEvolutionChain(nextEvolution);
          });
        }
      };

      // Clear the existing species list before traversing the chain
      // setSpeciesList([]);
      setSpeciesList([...[], evoChain.chain.species]);

      // Start recursive traversal from the initial chain data
      if (response.data.chain && response.data.chain.evolves_to.length > 0) {
        response.data.chain.evolves_to.forEach((evolution) => {
          traverseEvolutionChain(evolution);
        });
      }

      console.log(speciesList);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokemonEvoDetails = async () => {
    try {
      const details = await Promise.all(
        speciesList.map(async (pokemon) => {
          const response = await pokemonDAO.getPokeDetailByUrl({
            url: pokemon.url,
          });
          return response.data;
        })
      );
      setPokemonDetails(details);
    } catch (error) {
      console.error(error);
    }
  };


  // useEffect(() => {
  //   fetchPokemonData();
  // }, [pokemonName]);

  // useEffect(() => {
  //   fetchPokemonSpecies();
  // }, [pokemon]);

  // useEffect(() => {
  //   if (pokemonSpecies) {
  //     fetchPokemonEvolChain();
  //   }
  // }, [pokemonSpecies]);

  // useEffect(() => {
  //   if (speciesList.length > 0) {
  //     fetchPokemonEvoDetails();
  //   }
  // }, [speciesList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPokemonData();
        await fetchPokemonSpecies();
        if (pokemonSpecies) {
          await fetchPokemonEvolChain();
        }
        if (speciesList.length > 0) {
          await fetchPokemonEvoDetails();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemonName, pokemon, pokemonSpecies, speciesList]);


  if (!pokemon || !speciesList) {
    return <div>Loading...</div>;
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

        <section className="evoTable">
          <ul>
            {speciesList.map((species, index) => (

              <li key={index}>
                <a href={`/pokelist/${species.name}`}>
                  <strong>Name:</strong> {species.name}, <strong>URL:</strong> {species.url}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <h3>Evolution List</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sprite</th>
                </tr>
              </thead>
              <tbody>
                {pokemonEvoDetails.map((p) => (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>
                      {p.sprites ? (
                        <img src={p.sprites.other.dream_world.front_default} alt={p.name} />
                      ) : (
                        <span>No sprite available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section >


      </main>

    </>
  );
}

export default PokemonDetail;
