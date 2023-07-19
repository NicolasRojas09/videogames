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
                <h1 className={style.h1Landing}>GAME VISA</h1>
                <img className={style.joystick} src={require('../../vistas/joystick.png')} alt="joystick" />
                <button className={style.travel} onClick={() => navigate('/home')}>Travel</button>
            </div>
        </div>
    )
}

export default Landing