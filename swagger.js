const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation generated using swagger-autogen',
  },
  host: process.env.BASE_URL || 'localhost:8080', // Use BASE_URL if defined
  schemes: process.env.RENDER ? ['https'] : ['http'], // Use HTTPS for Render, HTTP for localhost
  basePath: '/', // This should be `/` if you're using a root path for your API
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; // Update this if your entry file is different

swaggerAutogen(outputFile, endpointsFiles, doc);
