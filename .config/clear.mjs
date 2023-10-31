import url from 'node:url';
import fs from 'node:fs/promises';
import path from 'node:path';

import { glob } from 'glob';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_FOLDER = path.resolve(__dirname, '../build');
const PUBLIC_FOLDER = path.resolve(__dirname, '../public');

try {
  await setupBuildDir();
  await copyPublicFolder();
} catch (error) {
  console.error(error);
}

async function setupBuildDir() {
  await fs.rm(BUILD_FOLDER, {
    force: true,
    recursive: true,
  });
  await fs.mkdir(BUILD_FOLDER, {
    recursive: true,
  });
}

async function copyPublicFolder() {
  const files = await glob(`${PUBLIC_FOLDER}/**/*`);
  for(const file of files) {
    const filename = path.basename(file);
    const stats = await fs.lstat(file);
    if (filename !== 'index.html' && stats.isFile()) {
      const destination = path.join(BUILD_FOLDER, filename);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.copyFile(file, destination);
    }
  }
}

