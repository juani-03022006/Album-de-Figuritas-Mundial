import { beforeEach, describe, expect, it, vi } from 'vitest';
import SeleccionesService from '../src/services/SeleccionesService.js';


describe('Selecciones Service', () => {
    let MockSeleccionesRepo;
    let seleccionesService;

    beforeEach(() => {
        MockSeleccionesRepo = {
            getSelecciones: vi.fn().mockResolvedValue([
                { id: 1, nombreSeleccion: 'Asociación del Fútbol Argentino', nombrePais: "Argentina", nroDesde: 1074, nroHasta: 1102, grupo: 'J' },
                { id: 2, nombreSeleccion: 'Fédération Française de Football', nombrePais: 'France', nroDesde: 929, nroHasta: 957, grupo: 'I' },
                { id: 3, nombreSeleccion: 'Confederação Brasileira de Futebol', nombrePais: 'Brazil', nroDesde: 233, nroHasta: 261, grupo: 'C' }
            ]),
            getSeleccionPorNombrePais: vi.fn().mockImplementation(async (nombrePais) => {
                const selecciones = [
                    { id: 1, nombreSeleccion: 'Asociación del Fútbol Argentino', nombrePais: "Argentina", nroDesde: 1074, nroHasta: 1102, grupo: 'J' },
                    { id: 2, nombreSeleccion: 'Fédération Française de Football', nombrePais: 'France', nroDesde: 929, nroHasta: 957, grupo: 'I' },
                    { id: 3, nombreSeleccion: 'Confederação Brasileira de Futebol', nombrePais: 'Brazil', nroDesde: 233, nroHasta: 261, grupo: 'C' }
                ];
                return selecciones.find(s => s.nombrePais.toLowerCase() === nombrePais.toLowerCase()) || null;
            }),
            createSeleccion: vi.fn().mockImplementation(async (nuevaSeleccion) => {
                return {
                    id: Math.floor(Math.random() * 1000) + 10,
                    ...nuevaSeleccion
                };
            }),
            modifySeleccion: vi.fn().mockImplementation(async (id, datosActualizados) => {
                return {
                    id,
                    ...datosActualizados
                };
            }),
        };

        seleccionesService = new SeleccionesService(MockSeleccionesRepo);
    });

    describe('Validaciones del Constructor', () => {
        it('Deberia lanzar un error si se instancia sin un repositorio', () => {
            expect(() => new SeleccionesService(null)).toThrow('El Repositorio de selecciones es obligatorio!');
        });

        it('Deberia lanzar un error si el repositorio no tiene las funciones esperadas', () => {
            const repoInvalido = { unMetodoCualquiera: () => { } };
            expect(() => new SeleccionesService(repoInvalido)).toThrow('El Repositorio de selecciones es obligatorio!');
        });
    });

    it('Obtener selecciones deberia devolver todas las selecciones de la base de datos', async () => {
        const selecciones = await seleccionesService.obtenerSelecciones();
        expect(selecciones).toEqual([
            { id: 1, nombreSeleccion: 'Asociación del Fútbol Argentino', nombrePais: "Argentina", nroDesde: 1074, nroHasta: 1102, grupo: 'J' },
            { id: 2, nombreSeleccion: 'Fédération Française de Football', nombrePais: 'France', nroDesde: 929, nroHasta: 957, grupo: 'I' },
            { id: 3, nombreSeleccion: 'Confederação Brasileira de Futebol', nombrePais: 'Brazil', nroDesde: 233, nroHasta: 261, grupo: 'C' }
        ]);
    });

    it('Si no hay selecciones en la base de datos, deberia devolver un array vacio', async () => {
        MockSeleccionesRepo.getSelecciones.mockResolvedValueOnce([]);

        const selecciones = await seleccionesService.obtenerSelecciones();
        expect(selecciones).toEqual([]);
    });

    it('Buscar una seleccion por nombre deberia devolver la seleccion correcta si existe', async () => {
        const seleccion = await seleccionesService.obtenerSeleccionPorNombrePais('Argentina');
        expect(seleccion).toEqual({ id: 1, nombreSeleccion: 'Asociación del Fútbol Argentino', nombrePais: "Argentina", nroDesde: 1074, nroHasta: 1102, grupo: 'J' });
    });

    it('Buscar una seleccion por nombre deberia llamar al repo con el string correcto', async () => {
        await seleccionesService.obtenerSeleccionPorNombrePais('France');
        expect(MockSeleccionesRepo.getSeleccionPorNombrePais).toHaveBeenCalledWith('France');
    });

    it('Buscar una seleccion que no existe deberia devolver null', async () => {
        const seleccion = await seleccionesService.obtenerSeleccionPorNombrePais('Italia');
        expect(seleccion).toBeNull();
    });

    it('Al crear una seleccion nueva, debe devolver el objeto creado con su ID asignado', async () => {
        const nuevaSeleccionDatos = { nombreSeleccion: 'Deutscher Fußball-Bund', nombrePais: 'Germany', nroDesde: 552, nroHasta: 580, grupo: 'E' };
        const seleccionCreada = await seleccionesService.crearSeleccion(nuevaSeleccionDatos);

        expect(seleccionCreada).toEqual({
            id: expect.any(Number),
            nombreSeleccion: 'Deutscher Fußball-Bund',
            nombrePais: 'Germany',
            nroDesde: 552,
            nroHasta: 580,
            grupo: 'E'
        });
    });

    it('Al modificar una seleccion, debe devolver la seleccion con los datos actualizados', async () => {
        const datosModificados = { id: 1, nombreSeleccion: 'Asociación del Fútbol Argentino', nombrePais: "Argentina", nroDesde: 1074, nroHasta: 1102, grupo: 'E' };
        const seleccionModificada = await seleccionesService.modificarSeleccion(1, datosModificados);

        expect(seleccionModificada).toEqual({
            id: 1,
            nombreSeleccion: 'Asociación del Fútbol Argentino',
            nombrePais: "Argentina",
            nroDesde: 1074,
            nroHasta: 1102,
            grupo: 'E'
        });
    });
});