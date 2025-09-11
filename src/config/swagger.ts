import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger/OpenAPI configuration options
 */
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Face Recognition API',
      version: '1.0.0',
      description: 'API para reconhecimento facial usando face-api.js com Node.js, TypeScript e SQLite',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            ok: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Error message'
            },
            stack: {
              type: 'string',
              description: 'Error stack trace (only in development)',
              example: 'Error: ...\n    at ...'
            }
          }
        },
        Health: {
          type: 'object',
          properties: {
            ok: {
              type: 'boolean',
              example: true
            }
          }
        }
      }
    }
  },
  apis: [
    './src/controllers/*.ts',
    './src/routes/*.ts',
    './src/app.ts'
  ]
};

/**
 * Generate OpenAPI specification from JSDoc comments
 */
export const specs = swaggerJsdoc(options);
