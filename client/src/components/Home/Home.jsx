import { filterGames, getGames, orderGames, pagesGames } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Pages from "../Pages/Pages";
import Card from '../Card/Card';
import style from './Home.module.css'


const Home = () => {
    const dispatch = useDispatch()
    const { games, currentPage, totalJuegos } = useSelector(state => state)
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
        dispatch(orderGames(event.target.value))
        dispatch(pagesGames(primeraPagina))
    }

    const handleFilter = (event) => {
        dispatch(filterGames(event.target.value))
        dispatch(pagesGames(primeraPagina))
    }

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
        <div>
            <div>
                <select onChange={handleOrder}>
                    <option value="default">select order</option>
                    <option value="AA">Alfabetic Asc.</option>
                    <option value="AD">Alfabetic Dec.</option>
                    <option value="RA">Rating Asc.</option>
                    <option value="RD">Rating Dec.</option>
                </select>
                <select onChange={handleFilter}>
                    <option value="default">select filter</option>
                    <option value="created">Created</option>
                    <option value="api">Api</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                </select>
            </div>
            <div className={style.contenedor}>{
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
            <Pages pagesHandler={pagesHandler} ultimaPagina={ultimaPagina} currentPage={currentPage} totalJuegos={totalJuegos} />
            </div>
        </div>
    )
}

export default Home