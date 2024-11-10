const express = require('express');

// Create an instance of an Express application
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to serve static files (optional)
app.use(express.static('public'));

// Home route, not a route we want to use...
app.get('/', (req, res) => {
    res.send('app/page.js');
});

app.get('/login', (req, res) => {
    res.send('got login');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import { createServer } from "http";
// import { parse } from "url";
// import next from "next";

// const port = parseInt(process.env.PORT || "3000", 10);
// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(port);

//   console.log(
//     `> Server listening at http://localhost:${port} as ${
//       dev ? "development" : process.env.NODE_ENV
//     }`,
//   );
// });