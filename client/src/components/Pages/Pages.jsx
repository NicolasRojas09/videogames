const Pages = ({ pagesHandler, ultimaPagina, currentPage, totalJuegos }) => {
    return (
        <div>
            <button onClick={() => pagesHandler('prev')} disabled={currentPage === 1 || totalJuegos === 0}>prev</button>
            <h2>{currentPage}</h2>
            <button onClick={() => pagesHandler('next')} disabled={currentPage === ultimaPagina || totalJuegos === 0}>next</button>
        </div>
    )
}

export default Pages