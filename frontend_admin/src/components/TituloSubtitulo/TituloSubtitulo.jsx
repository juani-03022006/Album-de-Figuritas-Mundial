export function TituloSubtitulo({ titulo, subtitulo }) {
    return (
        <>
            <h2 className="fw-bold mb-1">{titulo}</h2>
            <p className="text-muted mb-4">{subtitulo}</p>
        </>
    );
};
