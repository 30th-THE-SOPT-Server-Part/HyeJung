import express from 'express';
import apiRoute from './router/index'

const app = express();

app.use(express.json());

app.use('/api', apiRoute);

app.listen('8000', () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: 8000 🛡️
        #############################################
    `);
});
