export function AltaFiguritas({ isMaxEspeciales, isMaxJugadores }) {
    return (
        <>
        {/* Los alert los tengo que deshabilitar mañana para hacer los form de nuevo jugador y especial */}
            <div className="d-flex justify-content-end align-items-center gap-1 rounded-pill p-2 mb-3">
                {isMaxEspeciales ? <div className="alert alert-danger mb-0" role="alert">Alcanzaste el limite de Especiales</div> : ''}
                <button 
                    className="btn btn-sm btn-outline-primary me-4" 
                    onClick={() => { }}
                    disabled={isMaxEspeciales}
                >Añadir Especial</button>

                {isMaxJugadores ? <div className="alert alert-danger mb-0" role="alert">Alcanzaste el limite de Jugadores</div> : ''}
                <button 
                    className="btn btn-sm btn-outline-primary me-3" 
                    onClick={() => { }}
                    disabled={isMaxJugadores}
                >Añadir Jugador</button>
            </div>
        </>
    )
};
