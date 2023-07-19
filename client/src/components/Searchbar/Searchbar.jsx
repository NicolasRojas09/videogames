import { pagesGames, searchGames } from '../../redux/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './Searchbar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value)
    }

    return (
        <div>
            <input className={style.searchInput} type='search' onChange={handleChange} value={name}/>
            <button className={style.boton} onClick={() => {dispatch(searchGames(name));dispatch(pagesGames(1)) ; setName(''); navigate('/home')}}> Search </button>
        </div>
    );
}

export default SearchBar