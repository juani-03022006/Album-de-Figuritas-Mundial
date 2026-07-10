import { beforeEach, describe, expect, it, vi } from 'vitest';
import JugadoresService from '../src/services/JugadoresService.js';


describe('Jugadores Service', () => {
    let MockFiguritasRepo;
    let jugadoresService;

    beforeEach(() => {
        MockFiguritasRepo = {
            getJugadores: vi.fn().mockResolvedValue([
                { id: 1, idSeleccion: 1, nombre: 'Lionel', apellido: 'Messi', estatura: 170, club: 'Inter Miami CF (USA)', fechaNacimiento: '1987-06-24', idPosicion: 4 },
                { id: 2, idSeleccion: 1, nombre: 'Rodrigo', apellido: 'De Paul', estatura: 178, club: 'Inter Miami CF (USA)', fechaNacimiento: '1994-05-24', idPosicion: 3 },
                { id: 3, idSeleccion: 1, nombre: 'Emiliano', apellido: 'Martínez', estatura: 195, club: 'Aston Villa FC (ENG)', fechaNacimiento: '1992-09-02', idPosicion: 1 },
                { id: 4, idSeleccion: 2, nombre: 'Kylian', apellido: 'Mbappé', estatura: 180, club: 'Real Madrid C. F. (ESP)', fechaNacimiento: '1998-12-20', idPosicion: 4 },
                { id: 5, idSeleccion: 2, nombre: 'Ousmane', apellido: 'Dembele', estatura: 179, club: 'Paris Saint-Germain (FRA)', fechaNacimiento: '1997-05-15', idPosicion: 4 }
            ]),
            getJugadoresPorSeleccion: vi.fn().mockImplementation(async (idSeleccion) => {
                if (idSeleccion === 1) {
                    return [
                        { id: 1, idSeleccion: 1, nombre: 'Lionel', apellido: 'Messi', estatura: 170, club: 'Inter Miami CF (USA)', fechaNacimiento: '1987-06-24', idPosicion: 4 },
                        { id: 2, idSeleccion: 1, nombre: 'Rodrigo', apellido: 'De Paul', estatura: 178, club: 'Inter Miami CF (USA)', fechaNacimiento: '1994-05-24', idPosicion: 3 },
                        { id: 3, idSeleccion: 1, nombre: 'Emiliano', apellido: 'Martínez', estatura: 195, club: 'Aston Villa FC (ENG)', fechaNacimiento: '1992-09-02', idPosicion: 1 }
                    ];
                }
                if (idSeleccion === 2) {
                    return [
                        { id: 4, idSeleccion: 2, nombre: 'Kylian', apellido: 'Mbappé', estatura: 180, club: 'Real Madrid C. F. (ESP)', fechaNacimiento: '1998-12-20', idPosicion: 4 },
                        { id: 5, idSeleccion: 2, nombre: 'Ousmane', apellido: 'Dembele', estatura: 179, club: 'Paris Saint-Germain (FRA)', fechaNacimiento: '1997-05-15', idPosicion: 4 }
                    ];
                }
                return [];
            }),
            createJugador: vi.fn().mockImplementation(async (nuevoJugador) => {
                return {
                    id: Math.floor(Math.random() * 1000) + 10,
                    ...nuevoJugador
                };
            }),
            modifyJugador: vi.fn().mockImplementation(async (id, datosActualizados) => {
                return {
                    id,
                    ...datosActualizados
                };
            })
        };

        jugadoresService = new JugadoresService(MockFiguritasRepo);
    });

    describe('Validaciones del Constructor', () => {
        it('Deberia lanzar un error si se instancia sin un repositorio', () => {
            expect(() => new JugadoresService(null)).toThrow('El Repositorio de figuritas es obligatorio!');
        });

        it('Deberia lanzar un error si el repositorio no tiene las funciones esperadas', () => {
            const mockRepoInvalido = { unMetodoCualquiero: () => { } };
            expect(() => new JugadoresService(mockRepoInvalido)).toThrow('El Repositorio de figuritas es obligatorio!');
        });
    });

    it('Obtener jugadores deberia devolver todos los jugadores si hay en la base de datos', async () => {
        const jugadores = await jugadoresService.obtenerJugadores();
        expect(jugadores).toEqual([
            { id: 1, idSeleccion: 1, nombre: 'Lionel', apellido: 'Messi', estatura: 170, club: 'Inter Miami CF (USA)', fechaNacimiento: '1987-06-24', idPosicion: 4 },
            { id: 2, idSeleccion: 1, nombre: 'Rodrigo', apellido: 'De Paul', estatura: 178, club: 'Inter Miami CF (USA)', fechaNacimiento: '1994-05-24', idPosicion: 3 },
            { id: 3, idSeleccion: 1, nombre: 'Emiliano', apellido: 'Martínez', estatura: 195, club: 'Aston Villa FC (ENG)', fechaNacimiento: '1992-09-02', idPosicion: 1 },
            { id: 4, idSeleccion: 2, nombre: 'Kylian', apellido: 'Mbappé', estatura: 180, club: 'Real Madrid C. F. (ESP)', fechaNacimiento: '1998-12-20', idPosicion: 4 },
            { id: 5, idSeleccion: 2, nombre: 'Ousmane', apellido: 'Dembele', estatura: 179, club: 'Paris Saint-Germain (FRA)', fechaNacimiento: '1997-05-15', idPosicion: 4 }
        ]);
    });

    it('Si no hay jugadores en la base de datos, deberia devolver un array vacio', async () => {
        MockFiguritasRepo.getJugadores.mockResolvedValueOnce([]);

        const jugadores = await jugadoresService.obtenerJugadores();
        expect(jugadores).toEqual([]);
    });

    it('Buscar los jugadores de alguna seleccion, debe darnos solo los de dicha seleccion', async () => {
        const jugadoresArg = await jugadoresService.obtenerJugadoresPorSeleccion(1);
        const jugadoresFr = await jugadoresService.obtenerJugadoresPorSeleccion(2);

        expect(jugadoresArg).toEqual([
            { id: 1, idSeleccion: 1, nombre: 'Lionel', apellido: 'Messi', estatura: 170, club: 'Inter Miami CF (USA)', fechaNacimiento: '1987-06-24', idPosicion: 4 },
            { id: 2, idSeleccion: 1, nombre: 'Rodrigo', apellido: 'De Paul', estatura: 178, club: 'Inter Miami CF (USA)', fechaNacimiento: '1994-05-24', idPosicion: 3 },
            { id: 3, idSeleccion: 1, nombre: 'Emiliano', apellido: 'Martínez', estatura: 195, club: 'Aston Villa FC (ENG)', fechaNacimiento: '1992-09-02', idPosicion: 1 }
        ]);
        expect(jugadoresFr).toEqual([
            { id: 4, idSeleccion: 2, nombre: 'Kylian', apellido: 'Mbappé', estatura: 180, club: 'Real Madrid C. F. (ESP)', fechaNacimiento: '1998-12-20', idPosicion: 4 },
            { id: 5, idSeleccion: 2, nombre: 'Ousmane', apellido: 'Dembele', estatura: 179, club: 'Paris Saint-Germain (FRA)', fechaNacimiento: '1997-05-15', idPosicion: 4 }
        ]);
    });

    it('Buscar los jugadores de alguna seleccion, debo llamar al repo con el mismo id', async () => {
        await jugadoresService.obtenerJugadoresPorSeleccion(1);
        expect(MockFiguritasRepo.getJugadoresPorSeleccion).toHaveBeenCalledWith(1);
    });

    it('Buscar por una seleccion que no existe devuelve un array vacio', async () => {
        const jugadores = await jugadoresService.obtenerJugadoresPorSeleccion(99);
        expect(jugadores).toEqual([]);
    });

    it('Al crear un jugador nuevo, debe devolver el mismo jugador que creaste', async () => {
        const nuevoJugadorDatos = { idSeleccion: 3, nombre: 'Neymar Jr', posicion: 'Delantero' };
        const nuevoJugador = await jugadoresService.crearJugador(nuevoJugadorDatos);

        expect(nuevoJugador).toEqual({
            id: expect.any(Number),
            idSeleccion: 3,
            nombre: 'Neymar Jr',
            posicion: 'Delantero'
        });
    });

    it('Al modificar un jugador, debe devolver el jugador modificado', async () => {
        const jugadorModificado = await jugadoresService.modificarJugador(1, { idSeleccion: 1, nombre: 'Lionel Messi', posicion: 'Delantero' });

        expect(jugadorModificado).toEqual({
            id: 1,
            idSeleccion: 1,
            nombre: 'Lionel Messi',
            posicion: 'Delantero'
        });
    });
});