import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, '../data/db.json');
console.log('BANANA', file);
const adapter = new JSONFile(file);
const defaultData = { users: [] };
const client = new Low(adapter, defaultData);
await client.read();

export { client };
