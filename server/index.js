import cors from "cors";
import {} from "dotenv/config";
import express from "express";
import session from "express-session";
import mysql2 from "mysql2";
import routes from "./api/route.js";

const port = process.env.PORT || 8000;
const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());

// const db = mysql2.createPool({
//   host: process.env.HOST,
//   user: process.env.USER_NAME,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

const db = mysql2.createPool({
  host: process.env.GCP_HOST,
  user: process.env.GCP_USER_NAME,
  password: process.env.GCP_PASSWORD,
  database: process.env.GCP_DATABASE,
});

app.use("/api/v1", routes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default db;

// app.get("/", (req, res) => {
//   res.json("hello testing");
// });

// app.get("/videos", (req, res) => {
//   const q = "SELECT * FROM videos";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.get("/videos/:id", (req, res) => {
//   const videoId = req.params.id;
//   const q = "SELECT * FROM videos WHERE id = ? ";
//   db.query(q, [videoId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.post("/videos", (req, res) => {
//   const q = "INSERT INTO videos VALUES (?)";
//   const values = [req.body.id, req.body.title, req.body.watchcount];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("video has been added successfuly");
//   });
// });

// app.delete("/videos/:id", (req, res) => {
//   const videoId = req.params.id;
//   const q = " DELETE FROM videos WHERE id = ? ";

//   db.query(q, [videoId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.put("/videos/:id", (req, res) => {
//   const videoId = req.params.id;
//   const q =
//     "UPDATE videos SET `id`= ?, `title`= ?, `watchcount`= ? WHERE id = ?";
//   const values = [req.body.id, req.body.title, req.body.watchcount];

//   db.query(q, [...values, videoId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });
