const Validation = (gameData) => {
    const errors = {}

    // Validamos que no existan campos vacios

    if(!gameData.name || !gameData.description || !gameData.image || !gameData.plataforms || !gameData.releaseDate || !gameData.rating || gameData.genres.length === 0){
        errors.disabled = true
    }

    // Validamos name

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

    // Validamos la descripcion

    if(gameData.description.length === 0 || gameData.description.length < 20){
        errors.description = 'ingrese una descripcion de al menos 20 caracteres'
        errors.disabled = true
    }

    // Validamos la URL de la imagen

    if(!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(gameData.image)){
        errors.image = 'ingrese una URL valida'
        errors.disabled = true
    }

    // Validamos plataformas
    
    if(!gameData.plataforms){
        errors.plataforms = 'seleccione al menos una plataforma'
        errors.disabled = true
    }

    // Validamos la fecha

    if(!/^(19\d{2}|20\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/.test(gameData.releaseDate)){
        errors.releaseDate = 'ingrese una fecha valida (AAAA/MM/DD)'
        errors.disabled = true
    }

    // Validamos el rating

    if(gameData.rating < 0 || gameData.rating > 5 || !/^-?\d+$/.test(gameData.rating)){
        errors.rating = 'Debe ser un numero entero del 0 al 5'
        errors.disabled = true
    }

    // Validamos generos
    
    if(gameData.genres.length === 0){
        errors.genres = 'seleccione al menos un genero'
        errors.disabled = true
    }

    return errors
}

export default Validation;