import express, { Application } from 'express';
import bodyParser from 'body-parser';
import noteRoutes from './routes/noteRoutes';

const app: Application = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Route for note-related endpoints
app.use('/notes', noteRoutes);

export default app;
