import { useState } from "react";
import Validation from "../Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGames } from "../../redux/actions";
import { useEffect } from "react";

const Form = ({ login }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({disabled:true,})
    const [gameData, setGameData] = useState({
        name: '',
        image: '',
        description: '',
        plataforms: '',
        releaseDate: '',
        rating: '',
        genres: [],
    })

    const [plataformas, setPlataformas] = useState({
        PlayStation: false, Xbox: false, PC: false, Switch: false
    })

    const [generos, setGeneros] = useState({
        1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 10: false, 11: false, 14: false, 15: false, 17: false, 19: false, 28: false, 34: false, 40: false, 51: false,      59: false,      83: false,
    //   Racing    Shooter  Adventure   Action    RPG     Fighting    Puzzle   Strategy    Arcade   Simulation   Sports     Card       Family  Board-Games Educational  Casual     Indie   Massively Multiplayer Platformer
    })

    const handleChange = (event) => {
        setGameData({
            ...gameData,
            [event.target.name]: event.target.value
        })
        setErrors(Validation({
            ...gameData,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangePlatforms = (event) => {
        setPlataformas({
          ...plataformas,
          [event.target.name]: event.target.checked
        })
    }

    const handleChangeGenres = (event) => {
        setGeneros({
          ...generos,
          [event.target.name]: event.target.checked
        })
    }

    useEffect(() => {
        const plataformasSeleccionadas = Object.keys(plataformas).filter((key) => plataformas[key])
        const plataformasString = plataformasSeleccionadas.join(', ')
        const generosSeccionados = Object.keys(generos).filter((key) => generos[key])
        setGameData({
            ...gameData,
            plataforms: plataformasString,
            genres: generosSeccionados,
        })
        setErrors(Validation({
            ...gameData,
            plataforms: plataformasString,
            genres: generosSeccionados,
        }))
        
    }, [plataformas, generos])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(gameData);
        if(Object.keys(errors).length === 0){
            axios.post('http://localhost:3001/videogames', gameData)
            .then(response => {
                setGameData({
                    name: '',
                    image: '',
                    description: '',
                    plataforms: '',
                    releaseDate: '',
                    rating: '',
                    genres: [],
                })
            }).then(dispatch(getGames()))
            .then(navigate('/home'))
        }
    }

    return(
        <div>
            <button onClick={() => {navigate('/home')}}>X</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={gameData.name} onChange={handleChange}/>
                {errors.name && <p>{errors.name}</p>}

                <label htmlFor="description">Description:</label>
                <textarea type="text" name="description" style={{ resize: 'none' }} value={gameData.description} onChange={handleChange}/>
                {errors.description && <p>{errors.description}</p>}

                <label htmlFor="image">Image URL:</label>
                <input type="text" name="image" value={gameData.image} onChange={handleChange}/>
                {errors.image && <p>{errors.image}</p>}

                <label htmlFor="releaseDate">Release Date:</label>
                <input type="text" name="releaseDate" value={gameData.releaseDate} onChange={handleChange}/>
                {errors.releaseDate && <p>{errors.releaseDate}</p>}

                <label htmlFor="rating">Vote Rating:</label>
                <input type="text" name="rating" value={gameData.rating} onChange={handleChange}/>
                {errors.rating && <p>{errors.rating}</p>}

                <div>
                    <h5>Platforms</h5>
                    <input type="checkbox" name="PlayStation" checked={plataformas.PlayStation} onChange={handleChangePlatforms}/>
                    <input type="checkbox" name="Xbox" checked={plataformas.Xbox} onChange={handleChangePlatforms}/>
                    <input type="checkbox" name="PC" checked={plataformas.PC} onChange={handleChangePlatforms}/>
                    <input type="checkbox" name="Switch" checked={plataformas.Switch} onChange={handleChangePlatforms}/>
                </div>
                {errors.plataforms && <p>{errors.plataforms}</p>}

                <div>
                    <h5>Genres</h5>
                    <label htmlFor="1">Racing</label>
                    <input type="checkbox" name='1' checked={generos[1]} onChange={handleChangeGenres} />
                    <label htmlFor="2">Shooter</label>
                    <input type="checkbox" name='2' checked={generos[2]} onChange={handleChangeGenres} />
                    <label htmlFor="3">Adventure</label>
                    <input type="checkbox" name='3' checked={generos[3]} onChange={handleChangeGenres} />
                    <label htmlFor="4">Action</label>
                    <input type="checkbox" name='4' checked={generos[4]} onChange={handleChangeGenres} />
                    <label htmlFor="5">RPG</label>
                    <input type="checkbox" name='5' checked={generos[5]} onChange={handleChangeGenres} />
                    <label htmlFor="6">Fighting</label>
                    <input type="checkbox" name='6' checked={generos[6]} onChange={handleChangeGenres} />
                    <label htmlFor="7">Puzzle</label>
                    <input type="checkbox" name='7' checked={generos[7]} onChange={handleChangeGenres} />
                    <label htmlFor="10">Strategy</label>
                    <input type="checkbox" name='10' checked={generos[10]} onChange={handleChangeGenres} />
                    <label htmlFor="11">Arcade</label>
                    <input type="checkbox" name='11' checked={generos[11]} onChange={handleChangeGenres} />
                    <label htmlFor="14">Simulation</label>
                    <input type="checkbox" name='14' checked={generos[14]} onChange={handleChangeGenres} />
                    <label htmlFor="15">Sports</label>
                    <input type="checkbox" name='15' checked={generos[15]} onChange={handleChangeGenres} />
                    <label htmlFor="17">Card</label>
                    <input type="checkbox" name='17' checked={generos[17]} onChange={handleChangeGenres} />
                    <label htmlFor="19">Family</label>
                    <input type="checkbox" name='19' checked={generos[19]} onChange={handleChangeGenres} />
                    <label htmlFor="28">Board Games</label>
                    <input type="checkbox" name='28' checked={generos[28]} onChange={handleChangeGenres} />
                    <label htmlFor="34">Educational</label>
                    <input type="checkbox" name='34' checked={generos[34]} onChange={handleChangeGenres} />
                    <label htmlFor="40">Casual</label>
                    <input type="checkbox" name='40' checked={generos[40]} onChange={handleChangeGenres} />
                    <label htmlFor="51">Indie</label>
                    <input type="checkbox" name='51' checked={generos[51]} onChange={handleChangeGenres} />
                    <label htmlFor="59">Massively Multiplayer</label>
                    <input type="checkbox" name='59' checked={generos[59]} onChange={handleChangeGenres} />
                    <label htmlFor="83">Platformer</label>
                    <input type="checkbox" name='83' checked={generos[83]} onChange={handleChangeGenres} />
                </div>
                {errors.genres && <p>{errors.genres}</p>}

                <button type="submit" disabled={errors.disabled}>Submit</button>
                {errors.disabled && <h6>Completa todos los espacios para enviar</h6>}
            </form>
        </div>
    )
}

export default Form;