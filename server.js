import express from "express";
import messages from "./routes/messages.js";
import users from "./routes/users.js";


import { getMongoConn, initMongoDb } from "./utils/mongodbConn.js";
import { getMySqlConn, initMySqlDb } from "./utils/mysqlConn.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(async (req, res, next) => {
  req.mongoConn = await getMongoConn();
  req.mySqlconn = await getMySqlConn();
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", async (req, res) => {
  res.json({
    message: `Welcome to Express server`,
    version: "1.0.0",
  });
});

app.use("/api/users", users);
app.use("/api/messages", messages);

app.listen(PORT, async () => {
  await initMongoDb();
  await initMySqlDb();
  console.log(`Server is running on port ${PORT}...`);
});
