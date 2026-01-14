const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Flash Cards API',
        version: '1.0.0',
        description: 'API REST para una aplicación de aprendizaje de idiomas mediante flashcards. Permite gestionar usuarios, idiomas, categorías, palabras y el progreso de aprendizaje.',
        contact: {
            name: 'Flash Cards Team',
            email: ''
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: 'http://localhost:4001',
            description: 'Servidor de desarrollo'
        },
        {
            url: 'https://flash-cards-server-pfxv.onrender.com/',
            description: 'Servidor de producción'
        }
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Token JWT de Firebase Authentication. Para obtener el token, inicia sesión con Firebase desde el cliente.'
            }
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id_user: {
                        type: 'integer',
                        description: 'ID único del usuario'
                    },
                    firebase_uid: {
                        type: 'string',
                        description: 'UID del usuario en Firebase Authentication'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email del usuario'
                    },
                    name: {
                        type: 'string',
                        description: 'Nombre del usuario'
                    },
                    role: {
                        type: 'string',
                        enum: ['user', 'admin'],
                        description: 'Rol del usuario'
                    }
                }
            },
            Language: {
                type: 'object',
                properties: {
                    id_language: {
                        type: 'integer',
                        description: 'ID único del idioma'
                    },
                    language: {
                        type: 'string',
                        description: 'Nombre del idioma'
                    },
                    code: {
                        type: 'string',
                        description: 'Código ISO del idioma (ej: es, en, fr)'
                    }
                }
            },
            Category: {
                type: 'object',
                properties: {
                    id_category: {
                        type: 'integer',
                        description: 'ID único de la categoría'
                    },
                    category: {
                        type: 'string',
                        description: 'Nombre de la categoría'
                    },
                    language_id: {
                        type: 'integer',
                        description: 'ID del idioma al que pertenece'
                    }
                }
            },
            Word: {
                type: 'object',
                properties: {
                    id_word: {
                        type: 'integer',
                        description: 'ID único de la palabra'
                    },
                    word: {
                        type: 'string',
                        description: 'La palabra en el idioma objetivo'
                    },
                    definition: {
                        type: 'string',
                        description: 'Definición de la palabra'
                    },
                    transcription: {
                        type: 'string',
                        description: 'Transcripción fonética (ej: /dɒɡ/)'
                    },
                    example: {
                        type: 'string',
                        description: 'Ejemplo de uso de la palabra'
                    },
                    category_id: {
                        type: 'integer',
                        description: 'ID de la categoría'
                    },
                    image_id: {
                        type: 'integer',
                        description: 'ID de la imagen asociada'
                    },
                    status: {
                        type: 'string',
                        enum: ['saved', 'learned', null],
                        description: 'Estado de la palabra para el usuario (null si no está en su colección)'
                    }
                }
            },
            Progress: {
                type: 'object',
                properties: {
                    totalWords: {
                        type: 'integer',
                        description: 'Total de palabras en la colección del usuario'
                    },
                    learnedWords: {
                        type: 'integer',
                        description: 'Palabras marcadas como aprendidas'
                    },
                    progressPercentage: {
                        type: 'integer',
                        description: 'Porcentaje de progreso (0-100)'
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    ok: {
                        type: 'boolean',
                        example: false
                    },
                    message: {
                        type: 'string',
                        description: 'Mensaje de error'
                    }
                }
            }
        }
    },
    tags: [
        {
            name: 'Autenticación',
            description: 'Endpoints para registro y autenticación de usuarios'
        },
        {
            name: 'Admin - Usuarios',
            description: 'Gestión de usuarios (solo administradores)'
        },
        {
            name: 'Admin - Idiomas',
            description: 'Gestión de idiomas (solo administradores)'
        },
        {
            name: 'Admin - Categorías',
            description: 'Gestión de categorías (solo administradores)'
        },
        {
            name: 'Admin - Palabras',
            description: 'Gestión de palabras (solo administradores)'
        },
        {
            name: 'Usuario - Aprendizaje',
            description: 'Gestión de la colección personal de palabras'
        },
        {
            name: 'Usuario - Progreso',
            description: 'Consulta del progreso de aprendizaje'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
