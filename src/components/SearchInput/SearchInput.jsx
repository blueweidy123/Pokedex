import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "./SearchInput.css"
import pokemonDAO from '../../DAO/pokemonDAO';

function SearchInput(props) {

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [pokeNames, setPokeNames] = useState([]);
    const [loadSearch, setLoadSearch] = useState(false);
    const [showSearchRec, setShowSearchRec] = useState(false);

    const onChangeInputSearch = (event) => {
        setSearchValue(event.target.value);
        setShowSearchRec(true);
        if (!loadSearch) {
            getAllPokemonName();
            setLoadSearch(true);
        }
        // searchValue.length <= 0 ? setShowSearchRec(false) : setShowSearchRec(true);
        setShowSearchRec(event.target.value !== '');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`./${searchValue}`);
        }
    };

    const getAllPokemonName = async () => {
        try {
            const pokeNameResp = await pokemonDAO.getAllPokemons();
            // console.log("pokeNameResp.data");
            // console.log(pokeNameResp.data);

            setPokeNames(pokeNameResp.data.results);
            // console.log("pokeNames");
            // console.log(pokeNameResp.data.results);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="search-input">
            <input
                placeholder="Pokemon Name or Id"
                type="text"
                onChange={onChangeInputSearch}
                onKeyPress={handleKeyPress}
            ></input>
            {showSearchRec && <div className='recmd-items'>
                <ul>
                    {pokeNames.filter((pokemon) => pokemon.name.includes(searchValue))
                        .map((pokemon, index) => (
                            // pokeNames.filter((pokemon) => pokemon.name.includes(searchValue)).length > 0 ?
                            //     <>
                            //         <li key={index}>{pokemon.name}</li>
                            //     </> : <>
                            //         <li>nothing found!</li>
                            //     </>
                            <li key={index} onClick={() => navigate(`./${pokemon.name}`)}>{pokemon.name}</li>
                        ))
                    }
                </ul>
            </div>}

        </div>
    );
}

export default SearchInput;