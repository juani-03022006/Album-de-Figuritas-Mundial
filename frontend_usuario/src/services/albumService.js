import { API_BASE_URL } from '../config/api.js';
import { mockAlbumResponse } from '../data/mockAlbumResponse.js';

/**
 * Contrato esperado del backend:
 *
 * GET /api/users/:userId/album
 * 200 OK
 * {
 *   "userId": "demo",
 *   "selections": [
 *     {
 *       "id": "ARG",
 *       "name": "ARGENTINA",
 *       "association": "Asociación del Fútbol Argentino",
 *       "flagUrl": "https://...",
 *       "colors": {
 *         "main": "#8fa7e6",
 *         "accent1": "#f47833",
 *         "accent2": "#3a5bb3",
 *         "text": "#1c388c"
 *       },
 *       "stickers": [
 *         {
 *           "id": 1,
 *           "orientation": "portrait",
 *           "photoUrl": "https://...",
 *           "owned": true
 *         },
 *         {
 *           "id": 13,
 *           "orientation": "landscape",
 *           "photoUrl": "https://...",
 *           "owned": false
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export async function fetchUserAlbum(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/album`);

  if (!response.ok) {
    throw new Error(`No se pudo obtener el álbum (${response.status})`);
  }

  const data = await response.json();
  return normalizeAlbumResponse(data);
}

export function normalizeAlbumResponse(data) {
  const selections = Array.isArray(data?.selections) ? data.selections : [];

  return {
    userId: data?.userId ?? '',
    selections: selections.map(normalizeSelection),
  };
}

function normalizeSelection(selection) {
  const stickers = Array.isArray(selection?.stickers) ? selection.stickers : [];

  return {
    id: String(selection?.id ?? '').toUpperCase(),
    name: selection?.name ?? '',
    association: selection?.association ?? '',
    flagUrl: selection?.flagUrl ?? '',
    colors: {
      main: selection?.colors?.main ?? '#64748b',
      accent1: selection?.colors?.accent1 ?? '#94a3b8',
      accent2: selection?.colors?.accent2 ?? '#475569',
      text: selection?.colors?.text ?? '#ffffff',
    },
    stickers: stickers
      .map(normalizeSticker)
      .sort((a, b) => a.id - b.id),
  };
}

function normalizeSticker(sticker) {
  return {
    id: Number(sticker?.id),
    orientation: sticker?.orientation === 'landscape' ? 'landscape' : 'portrait',
    photoUrl: sticker?.photoUrl ?? null,
    owned: Boolean(sticker?.owned),
  };
}

export function getMockAlbumResponse() {
  return normalizeAlbumResponse(mockAlbumResponse);
}

export function getStickerById(stickers, stickerId) {
  return stickers.find((sticker) => sticker.id === stickerId) ?? null;
}

export function countOwnedStickers(stickers) {
  return stickers.filter((sticker) => sticker.owned).length;
}
