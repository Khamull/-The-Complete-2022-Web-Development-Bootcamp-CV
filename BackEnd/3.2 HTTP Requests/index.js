import express from "express";
const app = express();
const port = 3000;

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1><a href=\"https://www.linkedin.com/in/cpath/\">I Am  C.Path</a>");
})
app.get("/contact", (req, res) => {
  res.send("<h1>Contact Page</h1>");
})
app.get("/", (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <ul>
        <li><a href="/Headers">Headers</a></li>
        <li><a href="/about">About Page</a></li>
        <li><a href="/contact">Contact Page</a></li>
    </ul>
  `);
})

//3.1 Lesseon
// app.get("/", (req, res) => {
//   res.send("<h1>Home Page</h1>");
// })
app.get("/Headers", (req, res) => {
  //http://localhost:3000/Headers
  console.log(req.rawHeaders);
})
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
