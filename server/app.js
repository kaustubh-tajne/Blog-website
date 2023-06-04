const express = require("express");
const app = express();
const multer = require("multer");
const cors = require('cors');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const authRoute = require("./router/auth");
const userRoute = require("./router/users");
const postRoute = require("./router/posts");
const categoryRoute = require("./router/categories");

app.use(express.json());

require("./db/conn");
app.use(cors());

// app.use(require('./router/auth'));
// app.use(require('./router/users'));

const PORT = process.env.PORT;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, "hello.png");
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ mess: "File has been uploaded" });
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/catgories", categoryRoute);

app.listen(PORT, (err) => {
  console.log(`Server is running on port ${PORT}`);
});
