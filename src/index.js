import app from './app.js';
import { connectDB } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

async function main() {
  await connectDB();
  app.listen(3000);
  console.log("Servidor en el puerto 3000");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.set('../client/pages', path.join(__dirname, "pages"));
  app.set('view engine', 'jsx');
}

main();
