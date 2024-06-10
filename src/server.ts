import app from './app';
import { ConnectionPool, config } from 'mssql';
import dbConfig from './config/dbconfig';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

const pool = new ConnectionPool(dbConfig);

pool.connect().then(() => {
    console.log('Connected to the database.');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch((err) => {
    console.error('Error connecting to the database:', err.message, ' - ', err);
    process.exit(1); // Exit the process with failure
});
