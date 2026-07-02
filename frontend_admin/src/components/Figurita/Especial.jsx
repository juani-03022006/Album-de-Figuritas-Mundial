import { Button, Modal } from 'react-bootstrap';


export function Especial({handleShow, especial, alt, orientation = 'portrait' }) {
    const ratio = orientation === 'portrait' ? 'ratio-3x4' : 'ratio-4x3';

    return (
        <>
            <Button
                variant="link"
                onClick={() => handleShow(especial)}
                className="p-0 border-0 bg-transparent overflow-hidden rounded shadow-sm focus-ring focus-ring-dark"
                style={{ maxHeight: '170px', height: '100%', display: 'block' }}
                aria-label={alt || "Ver imagen completa"}
            >
                <div className={`${ratio} position-relative`}>
                    <img
                        height='150px'
                        src={especial.figurita.pathTopic}
                        alt={alt}
                    />
                </div>
            </Button>
        </>
    );
};
