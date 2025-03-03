import * as dotenv from 'dotenv';

const environment = process.env.NODE_ENV
if (environment === 'development') {
    dotenv.config({ path: '../../.env.development' });
} else {
    dotenv.config({ path: '../../.env.production' });
}

export const ActiveConfig = {
    NODE_ENV: environment!,
}
