import { setupServer } from 'msw/node';
import { env } from '@/config';
import { handlers } from './handlers';

export const server = setupServer(...handlers(env.API_URL));
