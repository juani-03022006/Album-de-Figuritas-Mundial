import { beforeEach, describe, expect, it, vi } from 'vitest';
import EspecialesService from '../src/services/EspecialesService';


describe('Especiales Service', async () => {
    let MockFiguritasRepo;
    let especialesService;

    beforeEach(() => {
        MockFiguritasRepo = {
            getEspeciales: vi.fn().mockResolvedValue([
                { id: 1, idSeleccion: 1, tipo: 'Escudo', nombre: 'Escudo AFA' },
                { id: 2, idSeleccion: 1, tipo: 'Formacion', nombre: 'Seleccion Argentina' },
                { id: 3, idSeleccion: 1, tipo: 'DT', nombre: 'Lionel Scaloni' },
                { id: 4, idSeleccion: 2, tipo: 'Escudo', nombre: 'Escudo FFF' },
                { id: 5, idSeleccion: 2, tipo: 'DT', nombre: 'Didier Deschamps' }
            ]),
            getEspecialesPorSeleccion: vi.fn().mockImplementation(async (idSeleccion) => {
                if (idSeleccion === 1) {
                    return [
                        { id: 1, idSeleccion: 1, tipo: 'Escudo', nombre: 'Escudo AFA' },
                        { id: 2, idSeleccion: 1, tipo: 'Formacion', nombre: 'Seleccion Argentina' },
                        { id: 3, idSeleccion: 1, tipo: 'DT', nombre: 'Lionel Scaloni' }
                    ];
                }
                if (idSeleccion === 2) {
                    return [
                        { id: 4, idSeleccion: 2, tipo: 'Escudo', nombre: 'Escudo FFF' },
                        { id: 5, idSeleccion: 2, tipo: 'DT', nombre: 'Didier Deschamps' }
                    ];
                }
                return [];
            }),
            createEspecial: vi.fn().mockImplementation(async (nuevaFigurita) => {
                return {
                    id: Math.floor(Math.random() * 1000) + 10,
                    ...nuevaFigurita
                };
            }),
            modifyEspecial: vi.fn().mockImplementation(async (id, datosActualizados) => {
                return {
                    id,
                    ...datosActualizados
                };
            })
        };

        especialesService = new EspecialesService(MockFiguritasRepo);
    });

    describe('Validaciones del Constructor', () => {
        it('Deberia lanzar un error si se instancia sin un repositorio', () => {
            expect(() => new EspecialesService(null)).toThrow('El Repositorio de figuritas es obligatorio!');
        });

        it('Deberia lanzar un error si el repositorio no tiene las funciones esperadas', () => {
            const mockRepoInvalido = { unMetodoCualquiero: () => { } };
            expect(() => new EspecialesService(mockRepoInvalido)).toThrow('El Repositorio de figuritas es obligatorio!');
        });
    });

    it('Obtener especiales deberia devolver todas las especiales si hay en la base de datos', async () => {
        const especiales = await especialesService.obtenerEspeciales();
        expect(especiales).toEqual([
            { id: 1, idSeleccion: 1, tipo: 'Escudo', nombre: 'Escudo AFA' },
            { id: 2, idSeleccion: 1, tipo: 'Formacion', nombre: 'Seleccion Argentina' },
            { id: 3, idSeleccion: 1, tipo: 'DT', nombre: 'Lionel Scaloni' },
            { id: 4, idSeleccion: 2, tipo: 'Escudo', nombre: 'Escudo FFF' },
            { id: 5, idSeleccion: 2, tipo: 'DT', nombre: 'Didier Deschamps' }
        ]);
    });

    it('Si no hay especiales en la base de datos, deberia devolver un array vacio', async () => {
        MockFiguritasRepo.getEspeciales.mockResolvedValueOnce([]);

        const especiales = await especialesService.obtenerEspeciales();
        expect(especiales).toEqual([]);
    });

    it('Buscar las especiales de alguna seleccion, debe darnos solo los de dicha seleccion', async () => {
        const especialesArg = await especialesService.obtenerEspecialesPorSeleccion(1);
        const especialesFr = await especialesService.obtenerEspecialesPorSeleccion(2);

        expect(especialesArg).toEqual([
            { id: 1, idSeleccion: 1, tipo: 'Escudo', nombre: 'Escudo AFA' },
            { id: 2, idSeleccion: 1, tipo: 'Formacion', nombre: 'Seleccion Argentina' },
            { id: 3, idSeleccion: 1, tipo: 'DT', nombre: 'Lionel Scaloni' }
        ]);
        expect(especialesFr).toEqual([
            { id: 4, idSeleccion: 2, tipo: 'Escudo', nombre: 'Escudo FFF' },
            { id: 5, idSeleccion: 2, tipo: 'DT', nombre: 'Didier Deschamps' }
        ]);
    });

    it('Buscar las especiales de alguna seleccion, debo llamar al repo con el mismo id', async () => {
        const especialesArg = await especialesService.obtenerEspecialesPorSeleccion(1);
        expect(MockFiguritasRepo.getEspecialesPorSeleccion).toHaveBeenCalledWith(1);
    });

    it('Buscar por una seleccion que no existe devuelve un array vacio', async () => {
        const especiales = await especialesService.obtenerEspecialesPorSeleccion(99);

        expect(especiales).toEqual([]);
    });

    it('Al crear una especial nueva, debe devolver la misma figurita que creaste', async () => {
        const nuevaEspecial = await especialesService.crearEspecial({ idSeleccion: 3, tipo: 'DT', nombre: 'Carleto Ancelotti' });

        expect(nuevaEspecial).toEqual({
            id: expect.any(Number),
            idSeleccion: 3,
            tipo: 'DT',
            nombre: 'Carleto Ancelotti'
        });
    });

    it('Al modificar una especial, debe devolver la especial modificada', async () => {
        const especialModificada = await especialesService.modificarEspecial(1, { idSeleccion: 1, tipo: 'Escudo', nombre: 'Escudo Argentina' });

        expect(especialModificada).toEqual({
            id: 1,
            idSeleccion: 1,
            tipo: 'Escudo',
            nombre: 'Escudo Argentina'
        });
    });
});
