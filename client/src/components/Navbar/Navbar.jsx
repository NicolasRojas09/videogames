import { getGames } from "../../redux/actions"
import { useDispatch } from "react-redux"
import SearchBar from "../Searchbar/Searchbar"

const Navbar = () => {
    const dispatch = useDispatch()

    return(
        <div>
            <button onClick={() => {dispatch(getGames())}}>inicio</button>
            <SearchBar/>
        </div>
    )
}

export default Navbar