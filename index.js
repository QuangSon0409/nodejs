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

import axios from "axios";
import express from "express";
import productRouter from "./routes/product";
const app = express();
app.use("/api", productRouter);

app.use(express.json()); // middelwear

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
