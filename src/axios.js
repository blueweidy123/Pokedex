import axios from "axios";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon",
});

// instance.get('pokemonName');

// => https://pokeapi.co/api/v2/pokemon/pokemonName

export default instance;