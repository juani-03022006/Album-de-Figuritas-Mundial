import { describe, expect, it } from 'vitest';
import {
  getLocalStickerNumber,
  normalizeCodigoUsuario,
  normalizeTipoFigurita,
} from '../src/services/albumUtils.js';

describe('albumUtils', () => {
  it('calcula el número local de una figurita dentro de su selección', () => {
    const seleccion = { nroDesde: 101, nroHasta: 110 };

    expect(getLocalStickerNumber({ nroFigurita: 101 }, seleccion)).toBe(1);
    expect(getLocalStickerNumber({ nroFigurita: 106 }, seleccion)).toBe(6);
  });

  it('normaliza tipos especiales usando el número local', () => {
    const seleccion = { nroDesde: 201, nroHasta: 210 };

    expect(normalizeTipoFigurita({ tipo: 'E', nroFigurita: 201 }, seleccion)).toBe('escudo');
    expect(normalizeTipoFigurita({ tipo: 'E', nroFigurita: 202 }, seleccion)).toBe('foto_seleccion');
    expect(normalizeTipoFigurita({ tipo: 'E', nroFigurita: 203 }, seleccion)).toBe('tecnico');
    expect(normalizeTipoFigurita({ tipo: 'J', nroFigurita: 204 }, seleccion)).toBe('jugador');
  });

  it('rechaza códigos de usuario vacíos', () => {
    expect(() => normalizeCodigoUsuario('   ')).toThrow('Código de usuario inválido');
  });
});
