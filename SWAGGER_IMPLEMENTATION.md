# Implementación de Swagger en Flash Cards API

## Resumen

Se ha implementado la documentación completa de la API utilizando **Swagger/OpenAPI 3.0** con las librerías `swagger-jsdoc` y `swagger-ui-express`. La documentación está disponible en `/api-docs` cuando el servidor está corriendo.

## Estructura de la Implementación

### 1. Archivo de Configuración: `src/configs/swagger.js`

Este archivo contiene la configuración completa de Swagger:

**Componentes principales:**

- **Info**: Información general de la API (título, versión, descripción, contacto)
- **Servers**: URLs de desarrollo y producción
- **Security Schemes**: Configuración de autenticación Bearer JWT
- **Schemas**: Modelos de datos reutilizables (User, Language, Category, Word, Progress, Error)
- **Tags**: Organización de endpoints por categorías

**Ejemplo de Schema:**
```javascript
User: {
    type: 'object',
    properties: {
        id_user: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        role: { type: 'string', enum: ['user', 'admin'] }
    }
}
```

### 2. Integración en `src/app.js`

Se importó y configuró Swagger UI:

```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swagger');

// Ruta de documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Flash Cards API Documentation'
}));
```

**Opciones de personalización:**
- Se ocultó la topbar por defecto de Swagger UI
- Se personalizó el título de la página

### 3. Documentación de Endpoints

Cada archivo de rutas (`src/routes/*.js`) incluye comentarios JSDoc con la especificación OpenAPI.

## Archivos Documentados

### Autenticación (`auth.routes.js`)
- `POST /auth/register` - Registro de usuario
- `GET /auth/me` - Obtener datos del usuario autenticado

### Usuario - Aprendizaje (`user.learning.routes.js`)
- `GET /user/languages` - Idiomas del usuario
- `GET /user/languages/available` - Idiomas disponibles
- `GET /user/languages/:language_id/categories` - Categorías de un idioma
- `GET /user/categories/:category_id/words` - Palabras de una categoría
- `POST /user/words` - Añadir palabra a la colección
- `DELETE /user/words/:word_id` - Eliminar palabra
- `PATCH /user/words/:word_id/learned` - Marcar como aprendida

### Usuario - Progreso (`user.progress.routes.js`)
- `GET /user/progress/categories/:category_id` - Progreso en una categoría
- `GET /user/progress/languages/:language_id/categories` - Progreso en categorías de un idioma
- `GET /user/progress/languages/:language_id` - Progreso en un idioma
- `GET /user/progress/languages` - Progreso en todos los idiomas

### Admin - Usuarios (`admin.users.routes.js`)
- `GET /admin/users` - Listar todos los usuarios
- `POST /admin/users` - Crear nuevo usuario

## Categorización por Tags

Los endpoints están organizados en los siguientes grupos:

1. **Autenticación**: Registro y login
2. **Admin - Usuarios**: Gestión de usuarios (admin only)
3. **Admin - Idiomas**: Gestión de idiomas (admin only)
4. **Admin - Categorías**: Gestión de categorías (admin only)
5. **Admin - Palabras**: Gestión de palabras (admin only)
6. **Usuario - Aprendizaje**: Colección personal de palabras
7. **Usuario - Progreso**: Consulta de progreso

## Características Implementadas

### Autenticación
- Security scheme configurado para Bearer JWT
- Botón "Authorize" para ingresar el token
- Token se incluye automáticamente en las peticiones protegidas

### Schemas Reutilizables
- User, Language, Category, Word, Progress, Error
- Referenciados con `$ref: '#/components/schemas/NombreSchema'`
- Reducción de duplicación de código

### Validaciones Documentadas
- Parámetros requeridos/opcionales
- Tipos de datos esperados
- Formatos específicos (email, integer, etc.)
- Enums para valores restringidos

### Códigos de Respuesta
- 200/201: Éxito
- 400: Error de validación
- 401: No autenticado
- 403: No autorizado (falta de permisos)
- 404: Recurso no encontrado
- 500: Error interno del servidor

### Ejemplos
- Ejemplos de request bodies
- Ejemplos de respuestas exitosas
- Datos de prueba realistas

## Cómo Usar la Documentación

### Para Desarrolladores

1. **Explorar endpoints**: Navega por las categorías y expande los endpoints
2. **Ver detalles**: Revisa parámetros, body, y posibles respuestas
3. **Probar endpoints**:
   - Click en "Try it out"
   - Para rutas protegidas, primero autoriza con tu token JWT
   - Completa los parámetros requeridos
   - Click en "Execute"
   - Revisa la respuesta

### Para Testing

1. Obtén un token JWT desde Firebase (a través del cliente)
2. Haz click en "Authorize" en Swagger
3. Ingresa el token en formato: `Bearer tu_token_aqui`
4. Prueba los endpoints protegidos directamente desde Swagger

## Recursos

- [OpenAPI Specification 3.0](https://swagger.io/specification/)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express Documentation](https://github.com/scottie1984/swagger-ui-express)
- [Swagger Editor](https://editor.swagger.io/) - Para validar la especificación

## Conclusión

La implementación de Swagger proporciona una documentación completa, interactiva y mantenible de la API. Facilita el desarrollo, testing y onboarding de nuevos desarrolladores, cumpliendo con los estándares de la industria.
