import { getGames, pagesGames } from "../../redux/actions"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import SearchBar from "../Searchbar/Searchbar.jsx"
import style from "./Navbar.module.css"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleAction = () => {
        if (location.pathname === '/home') {
          window.location.reload();
        } else {
          navigate('/home');
        }
      };

    return(
        <div className={style.navbar}>
            <img className={style.logo} onClick={() => {navigate('/')}} src={require('../../vistas/pngegg(1).png')} alt="logo" />
            <div className={style.searchCreate}>
                <button className={style.createGame} onClick={() => {navigate('/form')}}>Create Game</button>
                <SearchBar/>
                <button className={style.createGame} onClick={() => {dispatch(getGames()); dispatch(pagesGames(1)); handleAction()}}>Reload</button>
            </div>
        </div>
    )
}

export default Navbar