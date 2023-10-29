import { baseEnvironment } from './base-enviroment';
import { environment } from './environment';

export const finalEnvironment = {
  ...baseEnvironment,
  ...environment
};
