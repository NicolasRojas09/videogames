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
            <img src={game?.background_image} alt="" />
            <p>{game?.plataforms}</p>
        </div>
    )
}
export default Detail