# Album de Figuritas Mundial
Para iniciar el album, desde el directorio raiz, /albumfiguritasmundial seguir los pasos.


- Para correr el servidor primero debes instalar los paquetes con los comandos: 

```bash
npm install
npm run setup
```

- Despues ya podes correr todos los servidores con el comando:

```bash
npm run dev
```

- Por ultimo, ejecutar el docker para el login con keycloak:

```bash
docker compose up -d
```
- Para detener el docker borrando datos persistidos

```bash
docker compose down -v 
```

- Para detener el docker sin borrar datos

```bash
docker stop keycloak-dds
```

- Para popular la base de datos con los datos del mundial del 2026 se debe ejecutar:

```bash
npm run populate
```

- Se accede al login del album mediante la ruta http://localhost:5173/

- Utiliza usuario: 'admin' y contraseña: '123', para acceder a la interfaz de administracion del Album, si lo desea.