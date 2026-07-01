import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaFiguritas } from '../components/TablaFiguritas/TablaFiguritas.jsx';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import { Container, Spinner } from 'react-bootstrap';


function FiguritasSection() {
    return (
        <>
            <TituloSubtitulo titulo={'Figuritas'} subtitulo={'Gestioná las figuritas de cada Selección'} />

            <TablaFiguritas />
            {/* <Container className='card border-0 shadow-sm'>
                <Row className="text-center fw-bold p-2">
                    <Col md={4}>Celda 1/3 (A)</Col>
                    <Col md={4}>Celda 1/3 (B)</Col>
                    <Col md={4}>Celda 1/3 (C)</Col>
                </Row>

                <Row className="text-center p-2">
                    <Col md={3}>Celda 1/4</Col>
                    <Col md={3}>Celda 1/4</Col>
                    <Col md={3}>Celda 1/4</Col>
                    <Col md={3}>Celda 1/4</Col>
                </Row>

                <Row className="text-center p-2">
                    <Col md={3}>Celda 1/4</Col>
                    <Col md={3}>Celda 1/4</Col>
                    <Col md={3}>Celda 1/4</Col>
                    <Col md={3}>Celda 1/4</Col>
                </Row>
            </Container> */}
        </>
    );
};

export default FiguritasSection;
