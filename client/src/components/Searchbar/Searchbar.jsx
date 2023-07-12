import { searchGames } from '../../redux/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value)
    }

    return (
        <div>
            <input type='search' onChange={handleChange} value={name}/>
            <button onClick={() => {dispatch(searchGames(name)); setName('')}}> Search </button>
        </div>
    );
}

export default SearchBar