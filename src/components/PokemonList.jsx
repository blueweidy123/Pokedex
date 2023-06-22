import React, { useState, useEffect } from "react";
import axios from "axios";
import pokemonDAO from "../DAO/pokemonDAO";
import { Link } from "react-router-dom";

function PokemonList({ limit, page }) {
  const [pokeList, setPokeList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [dataCount, setdataCount] = useState(0);

  const fetchData = async (offset, limit) => {
    try {
      const response = await pokemonDAO.getPokeByPage({ offset, limit });
      setPokeList(response.data.results);
      console.log(response.data);
      setdataCount(Math.round(response.data.count / limit));
    } catch (error) {
      console.log(error);
    }
  };

  //06/23/2023

  useEffect(() => {
    fetchData(page - 1, limit);
  }, [page]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const details = await Promise.all(
          pokeList.map(async (pokemon) => {
            const response = await pokemonDAO.getPokeDetailByUrl({
              url: pokemon.url,
            });
            return response.data;
          })
        );
        setPokemonDetails(details);
        // console.log(details);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonDetails();
  }, [pokeList]);

  // console.log(pokemonDetails.data);
  // console.log("count:"+dataCount);

  return (
    <div className="pokelist">
      <table>
        <thead>
          <tr>
            <th>Pokemon id</th>
            <th>API details</th>
            <th>Pokemon name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {pokemonDetails.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>
                <a
                  href={`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`}
                  target="_blank"
                >
                  {pokemon.name}-JSON
                </a>
              </td>
              <td>
                <Link to={`/pokelist/${pokemon.name}`} target="_blank">
                  {pokemon.name}
                </Link>
              </td>
              <td>{pokemon.height}</td>
              <td>{pokemon.weight}</td>
              <td>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonList;
