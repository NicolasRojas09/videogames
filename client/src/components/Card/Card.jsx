import { useNavigate } from "react-router-dom"
import style from './Card.module.css'

const Card = ({ id, name, image, genres }) => {
    const navigate = useNavigate()

    return (
        <div className={style.card} onClick={() => navigate(`/detail/${id}`)}>
            <img className={style.image} src={image} alt={name} />
            <h3 className={style.name}>{name}</h3>
            <div className={style.genresContainer}>
                {genres?.map(genre => {
                    return( 
                        <h5 className={style.genres}>{genre.name}</h5>
                    )
                })}
            </div>
        </div>
    )
}

export default Card