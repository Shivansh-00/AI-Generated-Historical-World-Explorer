import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      const base = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      return stack ? `${base}\n${stack}` : base;
    })
  ),
  transports: [new winston.transports.Console()]
});
