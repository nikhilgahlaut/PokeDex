//css import
import { useEffect, useState } from 'react';
import './PokemonDetails.css'
// import { useParams } from 'react-router-dom';
import axios from 'axios'
import {Link,useParams} from 'react-router-dom'


function PokemonDetails() {

    const { id } = useParams();
    const POKEMON_DETAILS = "https://pokeapi.co/api/v2/pokemon/"

    const [pokemon, setPokemon] = useState(null)

    async function downloadPokemon() {
        const response = await axios.get(POKEMON_DETAILS + id)
        const pokemon = response.data;
        setPokemon({
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types,
            image: pokemon.sprites.other.dream_world.front_default

        })

    }

    useEffect(() => {
        downloadPokemon()
    }, [])

    return (
        <>
            <h1>
                <Link to='/'>
                    Pokedex
                </Link>
            </h1>
            {pokemon && <div className='poke-div'>
                <div className='pokemon-name'>
                    {pokemon.name}
                </div>
                <div>
                    <img className='image' src={pokemon.image} />
                </div>
                <div className='height'>
                    height:{pokemon.height}
                </div>
                <div className='weight'>
                    weight: {pokemon.weight}
                </div>
                <div className='types'>
                    <h1>Type:</h1>{pokemon.types.map(t => <span className='type'>{t.type.name}</span>)}
                </div>
            </div>}
        </>
    )

}

export default PokemonDetails;