import { describe, expect, it, vi } from 'vitest';
import {
  getAlbumByUsuarioCodigo,
  getSeleccionByUsuarioCodigo,
} from '../src/services/AlbumService.js';

function createModels() {
  const seleccionArgentina = {
    idSeleccion: 1,
    codigo: 'ARG',
    nombrePais: 'Argentina',
    nombreSeleccion: 'Argentina',
    urlBandera: '/flags/arg.png',
    grupo: 'A',
    nroDesde: 101,
    nroHasta: 110,
    colorPrincipal: '#75aadb',
    colorAcento1: '#ffffff',
    colorAcento2: '#f6b40e',
    colorTitulo: '#111111',
  };

  const figuritasArgentina = [
    {
      idFigurita: 1,
      nroFigurita: 101,
      tipo: 'E',
      pathTopic: '/escudo.png',
      jugador: null,
      especial: null,
    },
    {
      idFigurita: 2,
      nroFigurita: 104,
      tipo: 'J',
      pathTopic: '/messi.png',
      jugador: {
        nombre: 'Lionel',
        apellido: 'Messi',
        fechaNacimiento: '1987-06-24',
        estatura: 170,
        peso: 72,
        club: 'Inter Miami',
        posicion: { descripcion: 'Delantero' },
      },
      especial: null,
    },
  ];

  return {
    Usuario: {
      findOrCreate: vi.fn().mockResolvedValue([
        { idUsuario: 7, codigo: 'demo' },
        false,
      ]),
    },
    UsuarioFigurita: {
      findAll: vi.fn().mockResolvedValue([{ idFigurita: 2 }]),
    },
    Seleccion: {
      findAll: vi.fn().mockResolvedValue([seleccionArgentina]),
    },
    Figurita: {
      findAll: vi.fn().mockResolvedValue(figuritasArgentina),
    },
    FiguritaJugador: {},
    FiguritaEspecial: {},
    Posicion: {},
  };
}

describe('AlbumService', () => {
  it('arma el álbum de un usuario indicando qué figuritas ya tiene', async () => {
    const models = createModels();

    const album = await getAlbumByUsuarioCodigo('demo', models, {
      username: 'demo',
      nombreCompleto: 'Usuario Demo',
    });

    expect(models.Usuario.findOrCreate).toHaveBeenCalledWith({
      where: { codigo: 'demo' },
      defaults: {
        codigo: 'demo',
        nombre: 'Usuario Demo',
        ultimoPaqueteAbiertoAt: null,
      },
    });
    expect(album.usuarioId).toBe('demo');
    expect(album.selecciones).toHaveLength(1);
    expect(album.selecciones[0].id).toBe('ARG');
    expect(album.selecciones[0].figuritas[0]).toEqual(
      expect.objectContaining({
        id: 1,
        nroLocal: 1,
        tipo: 'escudo',
        tiene: false,
      })
    );
    expect(album.selecciones[0].figuritas[1]).toEqual(
      expect.objectContaining({
        id: 2,
        nroLocal: 4,
        tipo: 'jugador',
        tiene: true,
      })
    );
    expect(album.selecciones[0].figuritas[1].jugador).toEqual(
      expect.objectContaining({
        nombre: 'Lionel',
        apellido: 'Messi',
        posicion: 'Delantero',
      })
    );
  });

  it('busca una selección por código sin distinguir mayúsculas y minúsculas', async () => {
    const models = createModels();

    const seleccion = await getSeleccionByUsuarioCodigo('demo', 'arg', models);

    expect(seleccion.id).toBe('ARG');
    expect(seleccion.figuritas).toHaveLength(2);
  });

  it('devuelve 404 cuando la selección no existe', async () => {
    const models = createModels();

    await expect(getSeleccionByUsuarioCodigo('demo', 'BRA', models)).rejects.toMatchObject({
      message: 'Selección no encontrada',
      statusCode: 404,
    });
  });
});
