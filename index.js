import http from "http";
const server = http.createServer((req, res) => {
  const name = "son";
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
        <form action="/about" method="POST">
            <input name="name" />
            <button>Submit</button>
        </form>
    `);
  }
  if (req.url == "/about" && req.method == "POST") {
    res.end(`<h1>hello ${name}</h1>`);
  }
});
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
// horbt4w

// npm init -y
// npm i -D nodemon
// nodemon index.js
