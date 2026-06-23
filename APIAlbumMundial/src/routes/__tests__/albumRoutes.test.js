import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { createApp } from '../../app.js';

function createUsuario({ ultimoPaqueteAbiertoAt = null } = {}) {
  return {
    idUsuario: 1,
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
    tipo: id === 1 ? 'escudo' : 'jugador',
    jugador: id === 1 ? null : { nombre: `Jugador${id}`, apellido: 'Test' },
    especial: id === 1 ? { nombre: 'Escudo' } : null,
    Seleccion: {
      codigo: 'ARG',
      nombre: 'ARGENTINA',
      nroDesde: 1,
      nroHasta: 29,
    },
  };
}

function createModels({ usuario = createUsuario(), figuritas = Array.from({ length: 7 }, (_, index) => createFigurita(index + 1)) } = {}) {
  return {
    sequelize: { random: vi.fn(() => 'RANDOM()') },
    Usuario: {
      findOrCreate: vi.fn(async ({ where, defaults }) => [
        {
          ...usuario,
          codigo: where.codigo,
          nombre: defaults.nombre,
        },
        true,
      ]),
    },
    Figurita: { findAll: vi.fn(async () => figuritas) },
    Jugador: function Jugador() {},
    FigEspeciales: function FigEspeciales() {},
    Posicion: function Posicion() {},
    Seleccion: function Seleccion() {},
    UsuarioFigurita: { findOrCreate: vi.fn(async ({ where }) => [where, true]) },
  };
}

describe('APIAlbumMundial/routes/album', () => {
  it('GET /album/usuarios/:usuarioId/paquete/estado devuelve estado de paquete para backend_usuario', async () => {
    const models = createModels();
    const app = createApp(models);

    const res = await request(app)
      .get('/album/usuarios/mora/paquete/estado')
      .set('x-keycloak-name', 'Mora Garcia Sasso')
      .expect(200);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual(
      expect.objectContaining({
        disponible: true,
        intervaloHoras: 4,
        figuritasPorPaquete: 7,
      })
    );
    expect(models.Usuario.findOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { codigo: 'mora' },
        defaults: expect.objectContaining({ nombre: 'Mora Garcia Sasso' }),
      })
    );
  });

  it('POST /album/usuarios/:usuarioId/paquete/abrir devuelve las 7 figuritas abiertas', async () => {
    const models = createModels();
    const app = createApp(models);

    const res = await request(app)
      .post('/album/usuarios/demo/paquete/abrir')
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        abiertoAt: expect.any(String),
        estado: expect.objectContaining({ disponible: false }),
      })
    );
    expect(res.body.figuritas).toHaveLength(7);
    expect(res.body.figuritas[0]).toEqual(
      expect.objectContaining({
        nroFigurita: 1,
        nombre: 'Escudo',
        seleccion: { id: 'ARG', nombre: 'ARGENTINA' },
      })
    );
  });

  it('devuelve 409 si el usuario intenta abrir paquete antes de tiempo', async () => {
    const models = createModels({
      usuario: createUsuario({ ultimoPaqueteAbiertoAt: new Date().toISOString() }),
    });
    const app = createApp(models);

    const res = await request(app)
      .post('/album/usuarios/demo/paquete/abrir')
      .expect(409);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Todavía no hay un paquete disponible para este usuario',
        details: expect.objectContaining({ disponible: false }),
      })
    );
  });
});
