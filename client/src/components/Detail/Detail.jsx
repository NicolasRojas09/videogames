import axios from "axios";
import { useParams } from "react-router-dom";   
import { useState, useEffect } from "react";
import style from "./Detail.module.css"

const Detail = () => {
    const { id } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
            console.log(data);
            if (data.name) {
                setGame(data);
            }
        });
        return setGame({});
     }, [id]);

    return(
        <div className={style.contenedor}>
            <img className={style.imagenGame} src={game.image} alt="" />
            <h2 className={style.gameName}>{game.name}</h2>
            <div className={style.nameGen}>
                <div className={style.generos}>
                    {game.genres?.map(genre => {
                        return( 
                            <h5 className={style.cadaGenero}>{genre.name}</h5>
                        )
                    })}
                </div>
                <h3>{game.rating}⭐</h3>
            </div>
            <div className={style.contenedorDescr}>
                <h3>Description</h3>
                <p>{game.description}</p>
            </div>
            <h4>{game.plataforms}</h4>
            <h4>ReleaseDate: {game.releaseDate}</h4>
        </div>
    )
}
export default Detail