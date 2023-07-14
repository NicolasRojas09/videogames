import axios from "axios";
import { useEffect } from "react"
import style from "./Landing.module.css"
import { useNavigate } from "react-router-dom"

const Landing = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        axios('http://localhost:3001/genres')
    }, [])

    return (
        <div className={style.divGeneral}>
            <div className={style.cardBienvenida}>
                <h1>sdfsdf</h1>
                <button onClick={() => navigate('/home')}>Bienvenido</button>
            </div>
        </div>
    )
}

export default Landing