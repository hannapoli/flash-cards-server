# La API de "Flash Cards"

La API de "Flash Cards" desarrollada con el stack de PERN (PostgreSQL, Express, React, y Node.js) que permite a los usuarios crear, gestionar y practicar con tarjetas de palabras (flashcards) para facilitar el aprendizaje de nuevos idiomas. La aplicación incluye funcionalidades de autenticación de usuarios, gestión de usuarios, contenido y sesiones de práctica interactivas.

## Instalación y Configuración

1. Clona el repositorio y navega al directorio del proyecto:
    ```bash
    git clone git@github.com:hannapoli/flash-cards-server.git && cd flash-cards-server
    ```

2. Cambia a la rama develop y actualízala:
    ```bash
    git checkout develop && git pull origin develop
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Configura las variables de entorno:
   - Duplica el archivo `.env.template` y renómbralo a `.env`
   - Completa las siguientes variables:
     ```env
     PORT=4001 (en mi caso uso este puerto)
     BACKEND_URL=http://localhost:4001

        # Las URLs del Frontend para configurar CORS
     FRONT_URL
     FRONT_LOCALHOST
     
     # PostgreSQL
     Construye tu cadena de conexión:
     DATABASE_URL=postgresql://<tu_usuario>:<tu_clave>@localhost:<puerto>/<nombre_base_de_datos>
     
     # Firebase Admin SDK
     FIREBASE_SERVICE_ACCOUNT - el archivo JSON de credenciales que obtenerás de Firebase.
     
     ```

5. Configura la base de datos PostgreSQL:
   - Crea la base de datos.
   - Crea las tablas del archivo tables.sql.

6. Inicia la aplicación:
    ```bash
    npm run dev
    ```

7. La API estará disponible en el puerto indicado: `http://localhost:4001`

## ¿Qué hace esta aplicación?

Esta API REST proporciona el backend completo para una aplicación de aprendizaje de idiomas mediante flashcards. Permite:

- **Gestión de usuarios**: Registro, autenticación y autorización con Firebase Authentication y roles diferenciados (usuario y administrador).
- **Gestión de idiomas**: Crear, editar y eliminar idiomas disponibles en la plataforma.
- **Gestión de categorías**: Organizar palabras por categorías dentro de cada idioma.
- **Gestión de palabras**: CRUD completo de palabras con definiciones, transcripciones, ejemplos e imágenes.
- **Colección de palabras**: Los usuarios pueden añadir palabras a su colección personal, entrenarlas y marcarlas como aprendidas.
- **Sistema de progreso**: Seguimiento del progreso de aprendizaje por palabra, categoría e idioma.
- **Panel de administración**: Funcionalidades exclusivas para administradores como gestión de todos los usuarios y contenidos.

## Arquitectura y Seguridad

### Autenticación y Autorización

- **Firebase Authentication**: Gestiona el registro, inicio de sesión y tokens de autenticación.
- **Firestore**: Almacena documentos mínimos con los UIDs de Firebase para sincronización.
- **PostgreSQL**: Base de datos principal que almacena toda la información de usuarios (con referencia al UID de Firebase), palabras, categorías, idiomas y progreso.
- **Middleware de verificación**: Cada ruta protegida verifica el token de Firebase y consulta PostgreSQL para validar roles y permisos.

### Estructura de Permisos

- **Rutas públicas**: Inicio, registro y login.
- **Rutas de usuario**: Acceso a su colección personal, progreso y palabras disponibles.
- **Rutas de administrador**: Gestión completa de usuarios, idiomas, categorías y palabras.

## Estructura del Proyecto

```
flash-cards-server/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── configs/               # Configuraciones de DB y Firebase
│   │   ├── dbConnect.js
│   │   └── firebaseAdmin.js
│   ├── controllers/           # Lógica de la aplicación
│   │   ├── auth.controller.js
│   │   ├── admin.*.controller.js
│   │   ├── user.learning.controller.js
│   │   └── user.progress.controller.js
│   ├── models/                # Consultas a la base de datos
│   │   ├── *.model.js
│   │   └── *.queries.js
│   ├── middlewares/           # Validaciones y autenticación
│   │   ├── verify.token.middleware.js
│   │   ├── check.role.middleware.js
│   │   └── validate.input.middleware.js
│   ├── routes/                # Definición de endpoints
│   └── public/uploads/        # Imágenes subidas
├── tables.sql                 # Script de creación de base de datos
├── package.json               # Dependencias y scripts
```

## Endpoints Principales

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión (gestionado por Firebase en cliente)
- `GET /auth/me` - Obtener datos del usuario autenticado

### Usuario - Aprendizaje
- `GET /user/languages` - Obtener idiomas del usuario
- `GET /user/languages/available` - Obtener idiomas disponibles
- `GET /user/languages/:language_id/categories` - Obtener categorías de un idioma
- `GET /user/languages/:language_id/categories/available` - Obtener categorías disponibles
- `GET /user/categories/:category_id/words` - Obtener palabras de una categoría
- `POST /user/words` - Añadir palabra a la colección
- `DELETE /user/words/:word_id` - Eliminar palabra de la colección
- `PATCH /user/words/:word_id/learned` - Cambiar el estado: marcar palabra como aprendida o guardada

### Usuario - Progreso
- `GET /user/progress/languages` - Progreso en todos los idiomas
- `GET /user/progress/languages/:language_id` - Progreso en un idioma
- `GET /user/progress/languages/:language_id/categories` - Progreso en categorías de un idioma
- `GET /user/progress/categories/:category_id` - Progreso en una categoría

### Administrador
- `GET /admin/users` - Ver todos los usuarios
- `POST /admin/users/create` - Crear usuario
- `PUT /admin/users/:id` - Actualizar usuario
- `DELETE /admin/users/:id` - Eliminar usuario
- `GET /admin/languages` - CRUD de idiomas
- `GET /admin/categories` - CRUD de categorías
- `GET /admin/words` - CRUD de palabras (con subida de imágenes)

## Base de Datos

### Modelo de Datos

**Tablas principales:**
- `users` - Usuarios (con firebase_uid, email, name, role)
- `languages` - Idiomas disponibles
- `categories` - Categorías por idioma
- `words` - Palabras con definición, transcripción, ejemplo e imagen
- `user_learning` - Colección personal del usuario (status: 'saved' o 'learned')
- `uploads` - Metadata de imágenes subidas

**Relaciones:**
- Un idioma tiene muchas categorías
- Una categoría tiene muchas palabras
- Un usuario puede tener muchas palabras en su colección
- Cada entrada en user_learning relaciona un usuario con una palabra

## Características Principales

- API REST 
- Autenticación con Firebase Authentication
- Autorización basada en roles (user/admin)
- Validación de datos con express-validator
- Subida de imágenes con Multer
- Base de datos relacional PostgreSQL
- Consultas SQL optimizadas con joins y agregaciones
- Sistema de progreso con cálculos dinámicos
- CORS configurado para desarrollo
## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **Firebase Admin SDK** - Verificación de tokens
- **express-validator** - Validación de entradas
- **Multer** - Subida de archivos
- **pg** - Cliente de PostgreSQL
- **dotenv** - Variables de entorno
- **swagger-jsdoc** - Generación de documentación OpenAPI desde comentarios JSDoc
- **swagger-ui-express** - Interfaz interactiva de documentación API
- **EJS** - Motor de plantillas (para vistas opcionales)

## Metodología de Desarrollo

Este proyecto se desarrolló siguiendo metodología ágil SCRUM:
- Sprints 
- Backlog de tareas, priorización y planificación (Trello)
- Control de versiones con Git.

La API está desplegada en [Render](https://flash-cards-server-pfxv.onrender.com).

## Documentación de la API con Swagger

La API está completamente documentada con **Swagger/OpenAPI 3.0**. Puedes explorar todos los endpoints, ver ejemplos de peticiones y respuestas, y probar la API directamente desde la interfaz interactiva.

### Acceder a la Documentación

Una vez que el servidor esté corriendo, accede a la documentación en:

```
http://localhost:4001/api-docs
```

### Cómo usar Swagger para probar la API

1. **Inicia el servidor**: `npm run dev`
2. **Abre la documentación**: Navega a `http://localhost:4001/api-docs`
3. **Autenticación** (para rutas protegidas):
   - Haz clic en el botón "Authorize" en la parte superior
   - Obtén un token JWT desde Firebase Authentication (desde el cliente)
   - Ingresa el token en el formato: `Bearer tu_token_jwt`
   - Haz clic en "Authorize"
4. **Prueba los endpoints**:
   - Selecciona un endpoint
   - Haz clic en "Try it out"
   - Completa los parámetros requeridos
   - Haz clic en "Execute"
   - Ve la respuesta en tiempo real

### Implementación Técnica

La documentación se implementó utilizando:

- **swagger-jsdoc**: Para generar la especificación OpenAPI desde comentarios JSDoc en el código
- **swagger-ui-express**: Para la interfaz interactiva de Swagger UI

**Archivos clave:**
- `src/configs/swagger.js`: Configuración general de Swagger (schemas, tags, security)
- `src/routes/*.js`: Cada archivo de rutas incluye anotaciones JSDoc con la documentación de los endpoints
- `src/app.js`: Integración de Swagger UI en la ruta `/api-docs`

### Schemas Documentados

Los siguientes modelos están completamente documentados en Swagger:

- **User**: Usuario con sus propiedades (id, email, name, role)
- **Language**: Idioma (id, nombre, código ISO)
- **Category**: Categoría (id, nombre, idioma)
- **Word**: Palabra con toda su información (definición, transcripción, ejemplo, imagen)
- **Progress**: Progreso de aprendizaje (total, aprendidas, porcentaje)
- **Error**: Formato de respuestas de error

## Licencia

Proyecto educativo - Todos los derechos reservados