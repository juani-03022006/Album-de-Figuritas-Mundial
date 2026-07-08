import { afterEach, describe, expect, it, vi } from 'vitest';
import { getEstadoPaqueteByUsuarioCodigo } from '../src/services/PaqueteService.js';

describe('PaqueteService', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('marca el paquete como disponible cuando el usuario nunca abrió uno', async () => {
    const models = {
      Usuario: {
        findOrCreate: vi.fn().mockResolvedValue([
          { idUsuario: 1, codigo: 'demo', ultimoPaqueteAbiertoAt: null },
          false,
        ]),
      },
    };

    const estado = await getEstadoPaqueteByUsuarioCodigo('demo', models);

    expect(estado).toEqual(
      expect.objectContaining({
        disponible: true,
        intervaloHoras: 4,
        figuritasPorPaquete: 7,
        milisegundosRestantes: 0,
      })
    );
  });

  it('calcula el tiempo restante cuando el paquete todavía no está disponible', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T12:00:00.000Z'));

    const models = {
      Usuario: {
        findOrCreate: vi.fn().mockResolvedValue([
          {
            idUsuario: 1,
            codigo: 'demo',
            ultimoPaqueteAbiertoAt: new Date('2026-01-01T10:00:00.000Z'),
          },
          false,
        ]),
      },
    };

    const estado = await getEstadoPaqueteByUsuarioCodigo('demo', models);

    expect(estado.disponible).toBe(false);
    expect(estado.milisegundosRestantes).toBe(2 * 60 * 60 * 1000);
    expect(estado.proximoPaqueteDisponibleAt).toBe('2026-01-01T14:00:00.000Z');
  });
});
