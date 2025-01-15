import dotenv from 'dotenv';

dotenv.config();

export const BLOCKCYPHER_API_KEY = process.env.BLOCKCYPHER_API_KEY || '';

if (!BLOCKCYPHER_API_KEY) {
    console.error('BLOCKCYPHER_API_KEY is missing in the .env file!');
    process.exit(1);
}
