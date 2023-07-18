import axios from "axios";
import { useParams } from "react-router-dom";   
import { useState, useEffect } from "react";

const Detail = () => {
    const { id } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
            console.log(data);
            if (data.name) {
                setGame(data);
            } else {
                window.alert('No hay juegos con ese ID');
            }
        });
        return setGame({});
     }, [id]);

    return(
        <div>
            <img src={game.image} alt="" />
            <div>
                <h2>{game.name}</h2>
                <h3>{game.rating}⭐</h3>
            </div>
            <div>
                {game.genres?.map(genre => {
                    return( 
                        <h5>{genre.name}</h5>
                    )
                })}
            </div>
            <p>{game.description}</p>
            <h4>{game.plataforms}</h4>
            <h5>releaseDate: {game.releaseDate}</h5>
        </div>
    )
}
export default Detail