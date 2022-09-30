import pino from 'pino';
import pinoPretty from 'pino-pretty';

export const logger = pino({}, pinoPretty({ colorize: true, translateTime: 'yyyy-mm-dd HH:MM:ss', ignore: 'pid,hostname' }));
