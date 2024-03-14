import pino from 'pino';
import noir from 'pino-noir';
import {redactionKeys} from "./redactionKeys";
const serializers = { err: pino.stdSerializers.err };
export const logger = pino({
  redact: ['DATABASE_CONNECTION'],
  level: 'debug',
  serializers: noir(serializers, redactionKeys),
  transport: {
    target: 'pino-pretty',
  },
});
