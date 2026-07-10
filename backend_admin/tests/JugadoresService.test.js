import { describe, it, expect, vi, beforeEach } from 'vitest';
import JugadoresService from '../src/services/JugadoresService.js';


describe('JugadoresService', () => {
    let mockFiguritasAPI;
    let jugadoresService;

    const mockJugador = { 
        id: 1, 
        idSeleccion: 1, 
        nombre: 'Lionel', 
        apellido: 'Messi', 
        estatura: 170, 
        club: 'Inter Miami CF (USA)', 
        fechaNacimiento: '1987-06-24', 
        idPosicion: 4 
    };

    beforeEach(() => {
        mockFiguritasAPI = {
            getJugadores: vi.fn(),
            getJugadoresPorSeleccion: vi.fn(),
            createJugador: vi.fn(),
            modifyJugador: vi.fn(),
            deleteFigurita: vi.fn(),
        };
        
        jugadoresService = new JugadoresService(mockFiguritasAPI);
    });

    describe('Constructor', () => {
        it('debería lanzar un error si no se pasa FiguritasAPI', () => {
            expect(() => new JugadoresService()).toThrow('El Repositorio de Figuritas es obligatorio!');
        });

        it('debería lanzar un error si FiguritasAPI no cuenta con el método getJugadores', () => {
            const apiIncompleta = {};
            expect(() => new JugadoresService(apiIncompleta)).toThrow('El Repositorio de Figuritas es obligatorio!');
        });
    });

    describe('obtenerJugadores', () => {
        it('debería retornar el listado completo de jugadores en caso de éxito', async () => {
            const mockResultado = [mockJugador];
            mockFiguritasAPI.getJugadores.mockResolvedValue(mockResultado);

            const resultado = await jugadoresService.obtenerJugadores();

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.getJugadores).toHaveBeenCalledTimes(1);
        });

        it('debería lanzar el error si la llamada a la API falla', async () => {
            const mockError = new Error('Error de servidor externo');
            mockFiguritasAPI.getJugadores.mockRejectedValue(mockError);

            await expect(jugadoresService.obtenerJugadores()).rejects.toThrow('Error de servidor externo');
        });
    });

    describe('obtenerJugadoresPorSeleccion', () => {
        it('debería traer los jugadores filtrados por el idSeleccion provisto', async () => {
            const mockResultado = [mockJugador];
            mockFiguritasAPI.getJugadoresPorSeleccion.mockResolvedValue(mockResultado);

            const resultado = await jugadoresService.obtenerJugadoresPorSeleccion(1);

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.getJugadoresPorSeleccion).toHaveBeenCalledWith(1);
        });
    });

    describe('crearJugador', () => {
        it('debería llamar a createJugador mandando los datos correctos y retornar el nuevo jugador', async () => {
            const datosNuevoJugador = { 
                idSeleccion: 1, 
                nombre: 'Emiliano', 
                apellido: 'Martínez', 
                estatura: 195, 
                club: 'Aston Villa (ENG)', 
                fechaNacimiento: '1992-09-02', 
                idPosicion: 1 
            };
            const mockResultado = { id: 2, ...datosNuevoJugador };
            mockFiguritasAPI.createJugador.mockResolvedValue(mockResultado);

            const resultado = await jugadoresService.crearJugador(datosNuevoJugador);

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.createJugador).toHaveBeenCalledWith(datosNuevoJugador);
        });
    });

    describe('modificarJugador', () => {
        it('debería actualizar los datos de un jugador usando su ID', async () => {
            const datosNuevos = { club: 'Inter Miami CF' };
            const mockResultado = { ...mockJugador, ...datosNuevos };
            mockFiguritasAPI.modifyJugador.mockResolvedValue(mockResultado);

            const resultado = await jugadoresService.modificarJugador(1, datosNuevos);

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.modifyJugador).toHaveBeenCalledWith(1, datosNuevos);
        });
    });

    describe('eliminarJugador', () => {
        it('debería invocar deleteFigurita con el identificador de la figurita del jugador', async () => {
            mockFiguritasAPI.deleteFigurita.mockResolvedValue({ status: 'deleted' });

            const resultado = await jugadoresService.eliminarJugador(1);

            expect(resultado).toEqual({ status: 'deleted' });
            expect(mockFiguritasAPI.deleteFigurita).toHaveBeenCalledWith(1);
        });
    });
});
