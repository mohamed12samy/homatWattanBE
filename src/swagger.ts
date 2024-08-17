// src/swagger.ts
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import routes from './routes/routes';
const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Homat wattan',
      version: '1.0.0',
      description: '',
    },
    servers: [
      {
        url: 'http://localhost:3003', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/routes.ts'], // Path to your API route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
