//css imports

import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css'
import {Link} from 'react-router-dom'

function Pokedex() {
    return(
        <div className='poke-dox'>
            <h1>POKEDEX</h1>
            <Search/>
            <PokemonList/>
        </div>
    )
}

export default Pokedex;