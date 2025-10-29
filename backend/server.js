const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
// const swaggerUi = require('swagger-ui-express'); // <<< COMMENT OUT
// const swaggerJsdoc = require('swagger-jsdoc'); // <<< COMMENT OUT
const db = require('./models');
const allRoutes = require('./routes');
// const errorHandler = require('./middleware/error.handler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Swagger API Docs (COMMENTED OUT) ===
/* // <<< COMMENT OUT START
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clothing Store API',
      version: '1.0.0',
      description: 'API documentation for the Clothing Store E-commerce',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js'], // Đường dẫn đến các file routes (đã xóa comment)
};
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
*/ // <<< COMMENT OUT END

// === Routes ===
app.use('/api', allRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Clothing Store API!');
});

// === Error Handler ===
// app.use(errorHandler);

// === Start Server & Sync DB ===
app.listen(PORT, async () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully.'); // <-- CHÚ Ý DÒNG NÀY
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});