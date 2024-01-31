const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const { dbConnect } = require("./db");
require("dotenv").config();
const server = http.createServer(app);

// Handle middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

// api categories
const blogRoute = require("./src/app/modules/blog/blog.route");
const commentRoute = require("./src/app/modules/comment/comment.route");

// api routes
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/comments", commentRoute);

// default error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    res.send("success");
  }
});

app.get("/api", (_req, res) =>
  res.send("Hello! Blog server is working . . .!")
);

app.get("/api/health", (_req, res) =>
  res.send("Congrats, successfully api health checked")
);

app.use((req, res) => {
  res.status(404).json({ error: "API Not Found" });
});

dbConnect();

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`Blog server is running on port ${port}`)
);
