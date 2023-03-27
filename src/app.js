// import http from "http";
// const server = http.createServer((req, res) => {
//   const name = "son";
//   if (req.url == "/") {
//     res.setHeader("Content-Type", "text/html");
//     res.end(`
//         <form action="/about" method="POST">
//             <input name="name" />
//             <button>Submit</button>
//         </form>
//     `);
//   }
//   if (req.url == "/about" && req.method == "POST") {
//     res.end(`<h1>hello ${name}</h1>`);
//   }
// });
// server.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });
// const products = [
//   { name: "product1", id: 1 },
//   { nam: "product2", id: 2 },
// ];

import express from "express";
import productRouter from "./routes/product";
import cors from "cors";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/we17307");
const app = express();

// middlewear

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);

// app.listen(8080, () => {
//   console.log("server is running on port 8080");
// });

export const viteNodeApp = app;
