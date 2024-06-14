const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const helloWorldRoutes = require("./routes/hello.js");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const boardRoutes = require("./routes/board");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const statusRoutes = require("./routes/status");

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "taks-board api docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${process.env.HOST_URL}/api/v1`,
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

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/boards`, boardRoutes);
app.use(`/api/v1/`, helloWorldRoutes);
app.use(`/api/v1/user`, userRoutes);
app.use(`/api/v1/tasks`, taskRoutes);
app.use("/api/v1/status", statusRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
