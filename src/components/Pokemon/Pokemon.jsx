//css import
import './Pokemon.css'
import {Link} from 'react-router-dom'
function Pokemon({ name, url, id }) {
    return (
        <Link to={`./pokemon/${id}`}>
        <div className='pokemon'>
            <div
                className='pokemon-name'>{name}
            </div>
            <div>
                <img
                    className='pokemon-image' src={url}></img>
            </div>
        </div>
        </Link>
    )
}

export default Pokemon