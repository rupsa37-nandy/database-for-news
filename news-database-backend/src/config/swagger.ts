// // src/config/swagger.ts

// import swaggerJSDoc from 'swagger-jsdoc';

// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Curation API',
//     version: '1.0.0',
//     description: 'API for creating and managing curated news articles.',
//   },
//   servers: [
//     {
//       url: 'http://localhost:3000',
//       description: 'Development Server',
//     },
//   ],
//   components: {
//     schemas: {
//       SectionSchema: {
//         type: 'object',
//         properties: {
//           heading: { type: 'string', example: 'The Impact on the AI Sector' },
//           body: { type: 'string', example: 'The layoffs are expected to have a significant impact on Google\'s AI research...' },
//         },
//       },
//       CuratedNewsBody: {
//         type: 'object',
//         required: ['title', 'introduction', 'body', 'summary'],
//         properties: {
//           title: { type: 'string', example: 'Google Announces Major Layoffs in AI Division' },
//           introduction: { type: 'string', example: 'In a surprising move, tech giant Google has confirmed that it will be laying off thousands of employees...' },
//           body: { type: 'array', items: { $ref: '#/components/schemas/SectionSchema' } },
//           summary: { type: 'string', example: 'Google has announced significant layoffs...' },
//         },
//       },
//       // Schema for the Incoming Request Body
//       CurationRequest: {
//         type: 'object',
//         required: ['id', 'query', 'category', 'curated_news'],
//         properties: {
//           id: { type: 'string', format: 'uuid', example: 'c5b81130-3391-4915-8d50-c9690a1d1cf7' },
//           query: { type: 'string', example: 'snake' },
//           category: { type: 'string', example: 'Animal' },
//           curated_news: { $ref: '#/components/schemas/CuratedNewsBody' },
//         },
//       },
//       // Schema for the Successful Response Data
//       CurationResponseData: {
//         type: 'object',
//         properties: {
//           cid: { type: 'number', description: 'The unique generated number ID.', example: 1758537064966 },
//           query: { type: 'string', example: 'snake' },
//           category: { type: 'string', example: 'Animal' },
//           curated_news: { $ref: '#/components/schemas/CuratedNewsBody' },
//           _id: { type: 'string', example: '68edfac8eb0f19cd80828af2' },
//           __v: { type: 'number', example: 0 },
//         },
//       },
//       // Schema for the Full Successful Response
//       CurationSuccessResponse: {
//         type: 'object',
//         properties: {
//           success: { type: 'boolean', example: true },
//           message: { type: 'string', example: 'Curated news saved successfully!' },
//           data: { $ref: '#/components/schemas/CurationResponseData' },
//         },
//       },
//     },
//   },
// };

// const options = {
//   swaggerDefinition,
//   apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Adjust paths
// };

// export const swaggerSpec = swaggerJSDoc(options);