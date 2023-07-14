import { pagesGames, searchGames } from '../../redux/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value)
    }

    return (
        <div>
            <input type='search' onChange={handleChange} value={name}/>
            <button onClick={() => {dispatch(searchGames(name));dispatch(pagesGames(1)) ; setName(''); navigate('/home')}}> Search </button>
        </div>
    );
}

export default SearchBar