import { filterGames, getGames, opcionChange, orderGames, pagesGames } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Pages from "../Pages/Pages";
import Card from '../Card/Card';
import style from './Home.module.css'


const Home = () => {
    const dispatch = useDispatch()
    const { games, currentPage, totalJuegos, opcion } = useSelector(state => state)
    const games_per_page = 15

    useEffect(()=>{
        if(games.length === 0){dispatch(getGames())}
    }, [])

    const startIndex = (currentPage - 1) * games_per_page
    const endIndex = startIndex + games_per_page
    const juegosPaginaActual = games?.slice(startIndex, endIndex)
    const ultimaPagina = Math.ceil(totalJuegos / games_per_page)
    const primeraPagina = 1

    const handleOrder = (event) => {
        dispatch(opcionChange(event.target.value))
        dispatch(pagesGames(primeraPagina))
    }
    
    const handleFilter = (event) => {
        dispatch(filterGames(event.target.value))
        dispatch(orderGames(opcion))
        dispatch(pagesGames(primeraPagina))
    }
    
    useEffect(()=>{
        dispatch(orderGames(opcion))
    }, [opcion])
        
    const pagesHandler = (direccion) => {
        let nuevaPagina;

        if (direccion === 'prev') {
            nuevaPagina = currentPage - 1
        } else if (direccion === 'next') {
            nuevaPagina = currentPage + 1
        }
        
        if (nuevaPagina) {
            dispatch(pagesGames(nuevaPagina))
        }
    }

    return (
        <div className={style.contenedor}>
            <div>
                <label className={style.labels} htmlFor="orden">Order:</label>
                <select name="orden" className={style.selects} onChange={handleOrder}>
                    <option value="default">default order</option>
                    <option value="AA">Alfabetic Asc.</option>
                    <option value="AD">Alfabetic Dec.</option>
                    <option value="RA">Rating Asc.</option>
                    <option value="RD">Rating Dec.</option>
                </select>
                <label className={style.labels} htmlFor="filtro">Filter:</label>
                <select name="filtro" className={style.selects} onChange={handleFilter}>
                    <option value="default">Unfiltered</option>
                    <option value="created">Created</option>
                    <option value="api">Api</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Racing">Racing</option>
                    <option value="RPG">RPG</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Sports">Sports</option>
                    <option value="Card">Card</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Casual">Casual</option>
                    <option value="Indie">Indie</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Platformer">Platformer</option>
                </select>
            </div>
            <div className={style.contenedorCards}>{
                juegosPaginaActual?.map(game => {
                    return (
                        <Card
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            image={game.image}
                            genres={game.genres}
                        />
                    )
                })
            }
            </div>
            <div>
                <Pages pagesHandler={pagesHandler} ultimaPagina={ultimaPagina} currentPage={currentPage} totalJuegos={totalJuegos} />
            </div>
        </div>
    )
}

export default Home