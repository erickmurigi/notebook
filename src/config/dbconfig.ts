import { config } from 'mssql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to ensure environment variables are defined
function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}

// Database connection configuration for SQL Server
const dbConfig: config = {
    user: getEnvVar('DB_USER'),
    password: getEnvVar('DB_PASSWORD'),
    server: getEnvVar('DB_HOST'),
    database: getEnvVar('DB_NAME'),
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true, // Change to true for local dev / self-signed certs
    }
};

export default dbConfig;
