export function BotonesAltaFiguritas({ onAddEspecial, isMaxEspeciales, onAddJugador, isMaxJugadores }) {
    return (
        <>
            <div className="d-flex justify-content-end align-items-center gap-1 rounded-pill p-2 mb-3">
                {isMaxEspeciales ? <div className="alert alert-danger mb-0 me-2" role="alert">Alcanzaste el limite de Especiales</div> : ''}
                <button 
                    className="btn btn-sm btn-outline-primary me-4" 
                    onClick={onAddEspecial}
                    disabled={isMaxEspeciales}
                >Añadir Especial</button>

                {isMaxJugadores ? <div className="alert alert-danger mb-0 me-2" role="alert">Alcanzaste el limite de Jugadores</div> : ''}
                <button 
                    className="btn btn-sm btn-outline-primary me-3" 
                    onClick={onAddJugador}
                    disabled={isMaxJugadores}
                >Añadir Jugador</button>
            </div>
        </>
    )
};
