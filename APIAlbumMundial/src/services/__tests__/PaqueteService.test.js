import { describe, expect, it, vi } from 'vitest';
import {
  abrirPaqueteByUsuarioCodigo,
  getEstadoPaqueteByUsuarioCodigo,
} from '../PaqueteService.js';

function createUsuario({ ultimoPaqueteAbiertoAt = null } = {}) {
  return {
    idUsuario: 10,
    codigo: 'demo',
    ultimoPaqueteAbiertoAt,
    update: vi.fn(async function update(values) {
      Object.assign(this, values);
      return this;
    }),
  };
}

function createFigurita(id) {
  return {
    idFigurita: id,
    nroFigurita: id,
    tipo: 'jugador',
    jugador: {
      nombre: `Nombre${id}`,
      apellido: `Apellido${id}`,
    },
    especial: null,
    Seleccion: {
      codigo: 'ARG',
      nombre: 'ARGENTINA',
      nroDesde: 1,
      nroHasta: 29,
    },
  };
}

function createModels({ usuario = createUsuario(), figuritas = Array.from({ length: 7 }, (_, index) => createFigurita(index + 1)), alreadyOwnedIds = [] } = {}) {
  const alreadyOwned = new Set(alreadyOwnedIds);

  return {
    sequelize: { random: vi.fn(() => 'RANDOM()') },
    Usuario: {
      findOrCreate: vi.fn(async ({ defaults }) => [
        {
          ...usuario,
          codigo: usuario.codigo ?? defaults.codigo,
        },
        false,
      ]),
    },
    Figurita: {
      findAll: vi.fn(async () => figuritas),
    },
    Jugador: function Jugador() {},
    FigEspeciales: function FigEspeciales() {},
    Posicion: function Posicion() {},
    Seleccion: function Seleccion() {},
    UsuarioFigurita: {
      findOrCreate: vi.fn(async ({ where }) => [
        where,
        !alreadyOwned.has(where.idFigurita),
      ]),
    },
  };
}

describe('APIAlbumMundial/services/PaqueteService', () => {
  it('crea automaticamente el usuario y marca paquete disponible si nunca abrió uno', async () => {
    const models = createModels();

    const estado = await getEstadoPaqueteByUsuarioCodigo('mora', models, {
      nombreCompleto: 'Mora Garcia Sasso',
    });

    expect(models.Usuario.findOrCreate).toHaveBeenCalledWith({
      where: { codigo: 'mora' },
      defaults: {
        codigo: 'mora',
        nombre: 'Mora Garcia Sasso',
        ultimoPaqueteAbiertoAt: null,
      },
    });
    expect(estado).toEqual(
      expect.objectContaining({
        disponible: true,
        intervaloHoras: 4,
        figuritasPorPaquete: 7,
        milisegundosRestantes: 0,
      })
    );
  });

  it('rechaza abrir paquete si todavía no pasaron las 4 horas', async () => {
    const usuario = createUsuario({ ultimoPaqueteAbiertoAt: new Date().toISOString() });
    const models = createModels({ usuario });

    await expect(abrirPaqueteByUsuarioCodigo('demo', models)).rejects.toMatchObject({
      message: 'Todavía no hay un paquete disponible para este usuario',
      statusCode: 409,
      details: expect.objectContaining({ disponible: false }),
    });

    expect(models.Figurita.findAll).not.toHaveBeenCalled();
  });

  it('abre un paquete con 7 figuritas distintas y registra cada una en UsuarioFigurita', async () => {
    const usuario = createUsuario({ ultimoPaqueteAbiertoAt: null });
    const models = createModels({ usuario, alreadyOwnedIds: [2] });

    const paquete = await abrirPaqueteByUsuarioCodigo('demo', models);

    expect(paquete.figuritas).toHaveLength(7);
    expect(new Set(paquete.figuritas.map((figurita) => figurita.id)).size).toBe(7);
    expect(models.Figurita.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 7,
        order: 'RANDOM()',
      })
    );
    expect(models.UsuarioFigurita.findOrCreate).toHaveBeenCalledTimes(7);
    expect(usuario.update).toHaveBeenCalledWith({
      ultimoPaqueteAbiertoAt: expect.any(Date),
    });
    expect(paquete.figuritas.find((figurita) => figurita.id === 2).yaLaTenia).toBe(true);
  });

  it('informa error si la base no tiene suficientes figuritas cargadas', async () => {
    const models = createModels({ figuritas: [createFigurita(1), createFigurita(2)] });

    await expect(abrirPaqueteByUsuarioCodigo('demo', models)).rejects.toMatchObject({
      message: 'No hay suficientes figuritas cargadas para abrir un paquete',
      statusCode: 500,
    });
  });
});
