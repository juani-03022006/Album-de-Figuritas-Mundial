import { describe, it, expect, vi, beforeEach } from 'vitest';
import EspecialesService from '../src/services/EspecialesService.js';


describe('EspecialesService', () => {
    let mockFiguritasAPI;
    let especialesService;

    const mockFigurita = { id: 1, idSeleccion: 1, tipo: 'Escudo', nombre: 'Escudo AFA' };

    beforeEach(() => {
        mockFiguritasAPI = {
            getEspeciales: vi.fn(),
            getEspecialesPorSeleccion: vi.fn(),
            createEspecial: vi.fn(),
            modifyEspecial: vi.fn(),
            deleteFigurita: vi.fn(),
        };
        
        especialesService = new EspecialesService(mockFiguritasAPI);
    });

    describe('Constructor', () => {
        it('debería lanzar un error si no se provee FiguritasAPI', () => {
            expect(() => new EspecialesService()).toThrow('El Repositorio de Figuritas es obligatorio!');
        });

        it('debería lanzar un error si FiguritasAPI no tiene el método getEspeciales', () => {
            const apiInvalida = {};
            expect(() => new EspecialesService(apiInvalida)).toThrow('El Repositorio de Figuritas es obligatorio!');
        });
    });

    describe('obtenerEspeciales', () => {
        it('debería retornar una lista de figuritas especiales en caso de éxito', async () => {
            const mockResultado = [mockFigurita];
            mockFiguritasAPI.getEspeciales.mockResolvedValue(mockResultado);

            const resultado = await especialesService.obtenerEspeciales();

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.getEspeciales).toHaveBeenCalledTimes(1);
        });

        it('debería propagar el error si la API falla', async () => {
            const mockError = new Error('Error de conexión');
            mockFiguritasAPI.getEspeciales.mockRejectedValue(mockError);

            await expect(especialesService.obtenerEspeciales()).rejects.toThrow('Error de conexión');
        });
    });

    describe('obtenerEspecialesPorSeleccion', () => {
        it('debería retornar las figuritas filtradas por selección', async () => {
            const mockResultado = [mockFigurita];
            mockFiguritasAPI.getEspecialesPorSeleccion.mockResolvedValue(mockResultado);

            const resultado = await especialesService.obtenerEspecialesPorSeleccion(1);

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.getEspecialesPorSeleccion).toHaveBeenCalledWith(1);
        });
    });

    describe('crearEspecial', () => {
        it('debería crear una nueva figurita especial con éxito', async () => {
            const nuevaFigurita = { idSeleccion: 1, tipo: 'Estadio', nombre: 'Estadio Monumental' };
            const mockResultado = { id: 2, ...nuevaFigurita };
            mockFiguritasAPI.createEspecial.mockResolvedValue(mockResultado);

            const resultado = await especialesService.crearEspecial(nuevaFigurita);

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.createEspecial).toHaveBeenCalledWith(nuevaFigurita);
        });
    });

    describe('modificarEspecial', () => {
        it('debería modificar la figurita especial correctamente', async () => {
            const datosActualizados = { nombre: 'Escudo AFA Renovado' };
            const mockResultado = { ...mockFigurita, ...datosActualizados };
            mockFiguritasAPI.modifyEspecial.mockResolvedValue(mockResultado);

            const resultado = await especialesService.modificarEspecial(1, datosActualizados);

            expect(resultado).toEqual(mockResultado);
            expect(mockFiguritasAPI.modifyEspecial).toHaveBeenCalledWith(1, datosActualizados);
        });
    });

    describe('eliminarEspecial', () => {
        it('debería llamar a deleteFigurita con el id correcto', async () => {
            mockFiguritasAPI.deleteFigurita.mockResolvedValue({ success: true });

            const resultado = await especialesService.eliminarEspecial(1);

            expect(resultado).toEqual({ success: true });
            expect(mockFiguritasAPI.deleteFigurita).toHaveBeenCalledWith(1);
        });
    });
});
