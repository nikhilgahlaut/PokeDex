//css import 
import './PokemonList.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Pokemon from '../Pokemon/Pokemon'


function PokemonList() {
    const [pokemonList, setPokemonList] = useState([])
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon"

    const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL)
    const [nextUrl, setNextUrl] = useState(DEFAULT_URL)
    const [prevUrl, setPrevUrl] = useState(DEFAULT_URL)

    //DOWLOAD POKEMOON we use axios
    async function downloadPokemon() {
        const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL)
        const pokemonResults = response.data.results; //array of pokemon
        // console.log(response.data.results);

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous)

        const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        // console.log(pokemonPromise);
        const pokemonListData = await axios.all(pokemonPromise)
        // console.log(pokemonListData);
        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        });
        setPokemonList(pokemonFinalList)
        // console.log(pokemonFinalList);
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokedexUrl]);

    return (
        <div className="pokemon-list-wraper">
            <div><h1>Pokemon List</h1></div>
            <div className='change-btn'>
                <button className='prev-btn' onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                <button className='nxt-btn'onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
            </div>
            <div className='pokemon-list'>
                {pokemonList.map(pokemon => <Pokemon name={pokemon.name} id={pokemon.id} url={pokemon.image} />)}
            </div>

        </div>
    )

}

export default PokemonList;