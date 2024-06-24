import app from './app.js';
import { connectDB } from './db.js';

async function main() {
    await connectDB();
    app.listen(3000);
    console.log("servidor en el puerto 3000");
  }
  main();
  