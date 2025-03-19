const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Know Hive - API',
    description: 'Endpoints de consulta da API do Know Hive',
  },
  host: 'localhost:3000'
};

const outputFile = '../swagger-output.json';
const routes = ['../app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);