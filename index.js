const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config.db");
const bookRouter = require("./router/books.routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authorRouter = require("./router/authors.routes");
const registerRouter = require("./router/register.routes");
const path = require("path")
const multer = require("multer");
const commentRouter = require("./router/comment.routes");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
const {logger, loggerJSON} = require("./service/logger")

const PORT = process.env.PORT || 4000;

connectDB()

logger.error("Logger error")
logger.info("logger info")
logger.debug("logger debug")
logger.warn("logger warn")
loggerJSON.info("loggerjson info")
loggerJSON.error("loggerJson error")


app.use(bookRouter);
app.use(authorRouter);
app.use(registerRouter)
app.use(commentRouter)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on the port:${PORT}`);
});
