const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const helloWorldRoutes = require("./routes/hello.js");
const authMiddleware = require("./middleware/auth");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const boardRoutes = require("./routes/board");
// const taskRoutes = require('./routes/task');
const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "taks-board api docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${process.env.HOST_URL}/${process.env.HOST_URL_ENDPOINTS}`,
      },
    ],
  },
  apis: [`./routes/*.js`],
};

dotenv.config();

const app = express();

const corsOptions = {
  origin: [process.env.FRONTEND_URL_LOCAL, process.env.FRONTEND_URL_PROD],
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json());

const swaggerSpec = swaggerJSDoc(option);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(`/${process.env.HOST_URL_ENDPOINTS}/auth`, authRoutes);
app.use(`/${process.env.HOST_URL_ENDPOINTS}/boards`, boardRoutes);
app.use(`/${process.env.HOST_URL_ENDPOINTS}`, helloWorldRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
