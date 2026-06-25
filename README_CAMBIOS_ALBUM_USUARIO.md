# Cambios para recuperar funcionamiento de usuario después del merge

## APIAlbumMundial

- La ruta `/album` continúa activa para que `backend_usuario` pueda obtener el álbum.
- El álbum se ordena por `grupo`, `nroDesde` y `nombrePais`.
- Cada selección ahora devuelve `grupo`, `nroDesde` y `nroHasta`.
- Los tipos de figurita quedan normalizados como:
  - `escudo`
  - `foto_seleccion`
  - `tecnico`
  - `jugador`
- Las figuritas especiales se informan con nombre visible para que el frontend muestre si son escudo, foto de selección o director técnico.
- Las figuritas de jugador vuelven a exponer datos esperados por el frontend: nombre, apellido, fecha de nacimiento, estatura, peso, club y posición.

## backend_admin

- `npm run populate` genera URLs en `pathTopic`, que es el campo real usado por la API.
- Se corrigieron las queries de imágenes para escudos, fotos de selección, técnicos y jugadores.
- Las figuritas se crean en orden de álbum por grupos.
- `idFigurita` y `nroFigurita` coinciden.
- La numeración global queda sin saltos:
  - Grupo A: 1-116
  - Grupo B: 117-232
  - ...
  - Grupo L: 1277-1392

## frontend_usuario

- El álbum se muestra ordenado por grupos.
- Se agregó navegación visual por grupo.
- Cada figurita muestra un único número principal: `nroFigurita`.
- Las figuritas especiales muestran su tipo: Escudo, Foto selección o Director Técnico.
- Se evita mostrar el número interno de selección dentro de la figurita.
