import { getGames, pagesGames } from "../../redux/actions"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import SearchBar from "../Searchbar/Searchbar"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return(
        <div>
            <button onClick={() => {dispatch(getGames()); dispatch(pagesGames(1)); navigate('/home')}}>inicio</button>
            <SearchBar/>
        </div>
    )
}

export default Navbar