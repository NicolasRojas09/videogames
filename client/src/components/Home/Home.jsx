import { getGames, orderGames } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Card from '../Card/Card';
import style from './Home.module.css'


const Home = () => {
    const dispatch = useDispatch()
    const { games } = useSelector(state => state)

    useEffect(()=>{
        dispatch(getGames())
    }, [])

    const handleOrder = (event) => {
        dispatch(orderGames(event.target.value))
    }

    return (
        <div>
            <div>
                <select onChange={handleOrder}>
                    <option value="AA">Alfabetic Asc.</option>
                    <option value="AD">Alfabetic Dec.</option>
                    <option value="RA">Rating Asc.</option>
                    <option value="RD">Rating Dec.</option>
                </select>
            </div>
            <div className={style.contenedor}>{
                games?.map(game => {
                    return (
                        <Card
                            id={game.id}
                            name={game.name}
                            image={game.image}
                            genres={game.genres}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}

export default Home