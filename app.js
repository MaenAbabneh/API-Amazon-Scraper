// Project: amzone-api-scraper :: Created Date: 2023-10-01 

import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import { config } from './config/config.js'; // import the config object from the config.js file
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import pingRoutes from './routes/ping.js'; // import the ping routes


const app = express(); // create an instance of express

const swaggerDocument = YAML.load('./doc/openAPI.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors()); 
app.use(express.json()); 

app.use('/ping', pingRoutes); 
app.use('/api', productRoutes);



app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});


