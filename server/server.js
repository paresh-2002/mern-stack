import express from "express";
import dotenv from "dotenv";
import { mongoDBConnect } from "./config/db.js";
import productsRouter from './router/product.route.js'
import cors from 'cors'
import path from 'path'

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();
app.use('/api/products', productsRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Serve index.html for all routes in production
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // Additional configuration or middleware for development (e.g., logging)
  console.log("Running in development mode");
}

app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`listening on port http://localhost:${PORT}`);
});
