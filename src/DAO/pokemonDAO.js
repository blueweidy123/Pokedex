import axios from "axios";

const POKEMON_BASE_API = "https://pokeapi.co/api/v2/pokemon";

class PokemonDAO {
  getPokeByPage({ offset, limit }) {
    return axios.get(
      `${POKEMON_BASE_API}?offset=${offset * 10}&limit=${limit}`
    );
  }
  getPokeDetail({ pokeName }) {
    return axios.get(`${POKEMON_BASE_API}/${pokeName}`);
  }
  getPokeDetailByUrl({ url }) {
    return axios.get(url);
  }
}

const pokemonDAO = new PokemonDAO();

export default pokemonDAO;
