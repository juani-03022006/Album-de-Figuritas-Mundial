import { beforeEach, describe, expect, it, vi } from 'vitest';
import PosicionesService from '../src/services/PosicionesService.js';

describe('Posiciones Service', () => {
    let MockPosicionesRepo;
    let posicionesService;

    beforeEach(() => {
        MockPosicionesRepo = {
            getPosiciones: vi.fn().mockResolvedValue([
                { id: 1, nombre: 'Arquero' },
                { id: 2, nombre: 'Defensor' },
                { id: 3, nombre: 'Mediocampista' },
                { id: 4, nombre: 'Delantero' }
            ]),
            createPosicion: vi.fn().mockImplementation(async (nuevaPosicion) => {
                return {
                    id: Math.floor(Math.random() * 1000) + 10,
                    ...nuevaPosicion
                };
            }),
            modifyPosicion: vi.fn().mockImplementation(async (id, datosActualizados) => {
                return {
                    id,
                    ...datosActualizados
                };
            }),
            deletePosicion: vi.fn().mockImplementation(async (id) => {
                return { id, nombre: 'Posicion Eliminada' };
            })
        };

        posicionesService = new PosicionesService(MockPosicionesRepo);
    });


    describe('Validaciones del Constructor', () => {
        it('Deberia lanzar un error si se instancia sin un repositorio', () => {
            expect(() => new PosicionesService(null)).toThrow('El Repositorio de posiciones es obligatorio!');
        });

        it('Deberia lanzar un error si el repositorio no tiene las funciones esperadas', () => {
            const repoInvalido = { unMetodoCualquiera: () => { } };
            expect(() => new PosicionesService(repoInvalido)).toThrow('El Repositorio de posiciones es obligatorio!');
        });
    });


    it('Obtener posiciones deberia devolver todas las posiciones si hay en la base de datos', async () => {
        const posiciones = await posicionesService.obtenerPosiciones();
        expect(posiciones).toEqual([
            { id: 1, nombre: 'Arquero' },
            { id: 2, nombre: 'Defensor' },
            { id: 3, nombre: 'Mediocampista' },
            { id: 4, nombre: 'Delantero' }
        ]);
    });

    it('Si no hay posiciones en la base de datos, deberia devolver un array vacio', async () => {
        MockPosicionesRepo.getPosiciones.mockResolvedValueOnce([]);

        const posiciones = await posicionesService.obtenerPosiciones();
        expect(posiciones).toEqual([]);
    });

    it('Al crear una posicion nueva, debe devolver la misma posicion que creaste', async () => {
        const nuevaPosicionDatos = { nombre: 'Director Técnico' };
        const nuevaPosicion = await posicionesService.crearPosicion(nuevaPosicionDatos);

        expect(nuevaPosicion).toEqual({
            id: expect.any(Number),
            nombre: 'Director Técnico'
        });
    });

    it('Al modificar una posicion, debe devolver la posicion modificada', async () => {
        const posicionModificada = await posicionesService.modificarPosicion(1, { nombre: 'Guardameta' });

        expect(posicionModificada).toEqual({
            id: 1,
            nombre: 'Guardameta'
        });
    });

    it('Al eliminar una posicion, debe llamar al repositorio con el id correcto y retornar el elemento eliminado', async () => {
        const posicionEliminada = await posicionesService.eliminarPosicion(2);

        expect(MockPosicionesRepo.deletePosicion).toHaveBeenCalledWith(2);
        expect(posicionEliminada).toEqual({
            id: 2,
            nombre: 'Posicion Eliminada'
        });
    });
});