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
  const [isDataFetched, setIsDataFetched] = useState(false);

  const navigate = useNavigate();
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [evoChain, setEvoChain] = useState(null);
  // const [evoList, setEvoList] = useState([]);

  const [speciesList, setSpeciesList] = useState([]);

  const [evolutionChain, setEvolutionChain] = useState(null);
  const [pokemonEvoDetails, setPokemonEvoDetails] = useState([]);

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

      if (response.data.chain && response.data.chain.species) {
        // Clear the existing species list before traversing the chain
        setSpeciesList([response.data.chain.species]);

        if (response.data.chain.evolves_to.length > 0) {
          response.data.chain.evolves_to.forEach((evolution) => {
            traverseEvolutionChain(evolution);
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  const fetchPokemonEvoDetails = async () => {
    try {
      const details = await Promise.all(
        speciesList.map(async (pokemon) => {
          const response = await pokemonDAO.getPokeDetailByUrl({
            // url: pokemon.url,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
          });
          return response.data;
        })
      );
      setPokemonEvoDetails(details);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isDataFetched) {
          await fetchPokemonData();
          if (pokemon) {
            await fetchPokemonSpecies();
          }
          if (pokemonSpecies) {
            await fetchPokemonEvolChain();
          }
          if (speciesList.length > 0) {
            await fetchPokemonEvoDetails();
            setIsDataFetched(true);
          }

        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemon]);


  if (!isDataFetched) {
    return <div>Loading...</div>;
  }
  // console.log(speciesList);
  console.log(pokemon);


  return (
    <>
      <NavBar></NavBar>
      <main className="pd-container">
        <div className="--r--1">
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

          <section className="move-table">
            <h1 style={{ color: "white", textAlign: "center" }}>Moves</h1>
            <table>
              <thead>
                <tr>
                  <td>index</td>
                  <td>Moves</td>
                  <td>Details</td>
                </tr>
              </thead>
              <tbody>
                {pokemon.moves.map((move, index) => (
                  <tr>
                    <td><span>{index}</span></td>
                    <td>
                      {move.move.name}
                    </td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="--r--2">
          <section className="evoTable">
            <h1 style={{ color: "white", textAlign: "center" }}>Evolutions</h1>
            <div className="evoSprites">
              {pokemonEvoDetails.map((p) => (
                <div onClick={() => window.location.href = `/pokelist/${p.name}`}>
                  {p.sprites ? (
                    <div className="evoItem">
                      <div className="evocard">
                        <img src={p.sprites.other.dream_world.front_default} alt={p.name} />
                        <span>{p.name}</span>
                      </div>
                    </div>
                  ) : (
                    <span>No sprite available</span>
                  )}
                </div>

              ))}
            </div>
            <div>
              <h1 style={{ color: "white" }}>Stats</h1>
              <table>
                <tbody>
                  <tr>
                    <th>Species:</th>
                    <td>{pokemon.species.name}</td>
                  </tr>
                  <tr>
                    <th>Type:</th>
                    <td>
                      {pokemon.types.map((pType) => (
                        <span>{pType.type.name}  </span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>Height:</th>
                    <td>{pokemon.height}</td>
                  </tr>
                  <tr>
                    <th>Weight:</th>
                    <td>{pokemon.weight}</td>
                  </tr>
                  {pokemon.stats.map((stat) => (
                    <tr>
                      <th>Base {stat.stat.name}</th>
                      <td>{stat.base_stat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="abitily-table">
            <h1 style={{ color: "white", textAlign: "center" }}>Abilities</h1>
            <table>
              <thead>
                <tr>
                  <td>Ability</td>
                  <td>Details</td>
                </tr>
              </thead>
              <tbody>
                {pokemon.abilities.map((ability) => (
                  <tr>
                    <td>
                      {ability.ability.name}
                    </td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>


      </main>
    </>
  );
}

export default PokemonDetail;
