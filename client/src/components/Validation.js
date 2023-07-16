const Validation = (gameData) => {
    const errors = {}

    if(!gameData.name){
        errors.disabled = true
    }

    if(!/^[a-zA-Z0-9\s]+$/.test(gameData.name)){
        errors.name = 'No se aceptan simbolos'
        errors.disabled = true
    }
    if(!gameData.name){
        errors.name = 'ingrese un nombre'
        errors.disabled = true
    }
    if(gameData.name.length > 35){
        errors.name = 'No debe superar los 35 caracteres'
        errors.disabled = true
    }

    return errors
}

export default Validation;