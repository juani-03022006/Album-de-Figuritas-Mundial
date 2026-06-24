# Álbum Mundial de Fútbol — instalación rápida

Este proyecto usa cuatro piezas:

```txt
Keycloak          → autenticación, registro, roles y tokens
APIAlbumMundial  → base de datos SQLite, álbum, figuritas y paquetes
backend_usuario  → backend intermedio del usuario, valida login y consulta la API
frontend_usuario → React/Vite, interfaz del álbum
```

La idea es que alguien pueda hacer `git clone` y probar el sistema sin configurar Keycloak a mano.
El repositorio no sube un contenedor de Keycloak: sube un `compose.yml` y un archivo de importación del realm.
Cuando Keycloak arranca por primera vez, importa automáticamente el realm `dds-tareas`.

---

## Requisitos

Instalar:

- Node.js 20 o superior.
- npm.
- Podman + `podman compose`, o Docker + `docker compose`.

En WSL, lo más simple es usar Podman desde la terminal Linux.

---

## Instalación rápida con Podman

Desde la raíz del proyecto:

```bash
podman compose up -d
npm install
npm run setup
npm run dev
```

Después abrir:

```txt
http://localhost:5173
```

Usuario de prueba incluido:

```txt
username: demo
password: Clave123
```

También se puede usar el botón **Crear cuenta** para registrar usuarios nuevos desde Keycloak.

---

## Instalación rápida con Docker

Desde la raíz del proyecto:

```bash
docker compose up -d
npm install
npm run setup
npm run dev
```

---

## URLs del sistema

```txt
Frontend React:      http://localhost:5173
backend_usuario:     http://localhost:4000
APIAlbumMundial:     http://localhost:3100
Keycloak:            http://localhost:8081
Keycloak admin:      http://localhost:8081/admin/
```

Usuario administrador de Keycloak:

```txt
username: admin
password: admin123
```

---

## Qué se importa automáticamente en Keycloak

El archivo:

```txt
keycloak/import/dds-tareas-realm.json
```

crea:

```txt
Realm: dds-tareas
Client: dds-tareas-node-backend
Roles: usuario, admin
Registro público: activado
Usuario demo: demo / Clave123
```

Configuración principal del cliente:

```txt
Client type: OpenID Connect
Client authentication: OFF
Standard flow: ON
Direct access grants: OFF
Valid redirect URI: http://localhost:4000/auth/callback
Web origin: http://localhost:5173
Post logout redirects:
- http://localhost:5173/*
- http://localhost:4000/*
```

---

## Variables de entorno

El comando:

```bash
npm run setup
```

crea estos archivos si no existen:

```txt
backend_usuario/.env
frontend_usuario/.env
```

No los sobrescribe si ya existen.

### backend_usuario/.env

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
API_ALBUM_URL=http://localhost:3100

KEYCLOAK_AUTH_ENABLED=true
KEYCLOAK_BASE_URL=http://localhost:8081
KEYCLOAK_REALM=dds-tareas
KEYCLOAK_CLIENT_ID=dds-tareas-node-backend
KEYCLOAK_REDIRECT_URI=http://localhost:4000/auth/callback
KEYCLOAK_USER_ID_CLAIM=preferred_username
KEYCLOAK_AUDIENCE=account
KEYCLOAK_PKCE_METHOD=plain
```

### frontend_usuario/.env

```env
VITE_AUTH_ENABLED=true
VITE_AUTH_URL=http://localhost:4000
VITE_API_URL=/apiUsuario
VITE_USER_ID=demo
```

---

## Base de datos

La API usa SQLite en:

```txt
APIAlbumMundial/src/DB/figuritas.db
```

La base no se sube a Git. Al iniciar la API por primera vez, si la base está vacía, se ejecuta el seeder.

Para resetear sólo la base del álbum:

```bash
npm run reset:api-db
```

Después volver a levantar la API o reiniciar `npm run dev`.

---

## Resetear Keycloak

Si querés borrar realm, usuarios, clientes y volver a importar desde cero:

Con Podman:

```bash
podman compose down -v
podman compose up -d
```

Con Docker:

```bash
docker compose down -v
docker compose up -d
```

Cuidado: `-v` elimina el volumen persistente de Keycloak.

---

## Comandos útiles

Ver logs de Keycloak con Podman:

```bash
podman logs -f keycloak-dds
```

Ver contenedores activos:

```bash
podman ps
```

Levantar sólo los servicios Node sin tocar Keycloak:

```bash
npm run dev
```

Levantar partes por separado:

```bash
npm run dev:api
npm run dev:backend
npm run dev:frontend
```

---

## Flujo esperado para usuarios nuevos

1. Usuario entra a `http://localhost:5173`.
2. Toca **Crear cuenta**.
3. Keycloak registra el usuario.
4. El usuario inicia sesión.
5. `backend_usuario` valida el token.
6. `APIAlbumMundial` crea automáticamente el usuario en la base si no existe.
7. El usuario empieza con álbum vacío.
