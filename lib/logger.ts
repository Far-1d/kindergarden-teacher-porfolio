// logger.js
import winston from 'winston';

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: combine(timestamp(), json()), // Define the log format
  transports: [
    new winston.transports.File({ filename: 'app.log' }), // Log to a file
    new winston.transports.Console(), // Log to console (optional)
  ],
});

export { logger };
