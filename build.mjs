import { mkdir, readFile, writeFile } from 'node:fs/promises';

let release;
try {
  release = JSON.parse(await readFile('config/release.json', 'utf8')).release;
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  console.error('ERR_RELEASE_CONFIG_MISSING: config/release.json');
  process.exit(1);
}
await mkdir('dist', { recursive: true });
await writeFile('dist/version.json', JSON.stringify({ application: 'deployment-support-decoy', release }) + '\n');
await writeFile('dist/index.html', '<!doctype html><title>Archived checkout demo</title><h1>Archived checkout demo</h1>');
console.log('Static build completed');
