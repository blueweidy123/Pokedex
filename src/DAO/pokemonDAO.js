import axios from "axios";

const POKEMON_BASE_API = "https://pokeapi.co/api/v2/pokemon";

class PokemonDAO {
  getPokeByPage({ offset, limit }) {
    return axios.get(
      `${POKEMON_BASE_API}?offset=${offset * 10}&limit=${limit}`
    );
  }
  getAllPokemons() {
    return axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  }
  getPokeDetail({ pokeName }) {
    return axios.get(`${POKEMON_BASE_API}/${pokeName}`);
  }
  getPokeDetailByUrl({ url }) {
    return axios.get(url);
  }
  getPokeSpecies({ pokename }) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokename}/`);
  }
}

const pokemonDAO = new PokemonDAO();

export default pokemonDAO;
