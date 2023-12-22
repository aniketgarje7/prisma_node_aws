const express = require("express");
const authRoutes = require("./routes/auth.routes");
const folderRoutes = require("./routes/folder.routes");
const fileRoutes = require("./routes/file.routes");
require("dotenv").config();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

async function main() {
  app.use(express.json());
  const PORT = process.env.PORT;
  const CORS = process.env.CORS_URL;
  
  app.use(
    cors({
      origin: CORS,
    })
  );
  
  // routes
  app.use("/auth", authRoutes);
  app.use("/file", fileRoutes);
  app.use("/folder", folderRoutes);
  // api documentetion
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(PORT, () => {
    console.log("server running on " + PORT);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })