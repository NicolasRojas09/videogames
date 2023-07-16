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
        image: 'asd',
        description: '',
        plataforms: '',
        releaseDate: '2011-12-12',
        rating: 0,
        genres: [1],
    })

    const [plataformas, setPlataformas] = useState({
        PlayStation: false,
        Xbox: false,
        PC: false,
        Switch: false
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
        console.log(gameData.plataforms);
    }

    const handleChangeCheckBox = (event) => {
        console.log(event.target.checked);
        setPlataformas({
          ...plataformas,
          [event.target.name]: event.target.checked
        })
    }

    useEffect(() => {
        const plataformasSeleccionadas = Object.keys(plataformas).filter((key) => plataformas[key])
        const plataformasString = plataformasSeleccionadas.join(', ')
        setGameData({
            ...gameData,
            plataforms: plataformasString
        })
    }, [plataformas])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(gameData.plataforms);
        if(Object.keys(errors).length === 0){
            axios.post('http://localhost:3001/videogames', gameData)
            .then(response => {
                setGameData({
                    name: '',
                    image: '',
                    description: '',
                    plataforms: '',
                    releaseDate: '',
                    rating: 0,
                    genres: [],
                })
            }).then(dispatch(getGames()))
            .then(navigate('/home'))
            
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={gameData.name} onChange={handleChange}/>
            {errors.name && <p>{errors.name}</p>}

            <label htmlFor="description">Description:</label>
            <textarea type="text" name="description" style={{ resize: 'none' }} value={gameData.description} onChange={handleChange}/>
            {errors.description && <p>{errors.description}</p>}

            <input type="checkbox" name="PlayStation" checked={plataformas.PlayStation} onChange={handleChangeCheckBox}/>
            <input type="checkbox" name="Xbox" checked={plataformas.Xbox} onChange={handleChangeCheckBox}/>
            <input type="checkbox" name="PC" checked={plataformas.PC} onChange={handleChangeCheckBox}/>
            <input type="checkbox" name="Switch" checked={plataformas.Switch} onChange={handleChangeCheckBox}/>


            <button type="submit" disabled={errors.disabled}>Submit</button>
        </form>
    )
}

export default Form;