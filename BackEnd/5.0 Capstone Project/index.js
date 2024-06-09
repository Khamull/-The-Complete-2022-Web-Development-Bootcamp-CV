import express from "express";
import bodyParser from "body-parser";
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
// Lista para armazenar os posts
let posts = [];

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  

  app.get("/", async (req, res) => {
    try {
      const newAuthor = await fetchData();
      res.render("index.ejs", { newAuthor, posts });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  });

// Rota POST para criar um novo post
app.post('/posts', (req, res) => {
  const { texto, autor } = req.body;
  const hora = new Date().toISOString();
  
  const novoPost = {
    texto,
    hora,
    autor,
    liked: false
  };

  posts.push(novoPost);
  res.status(201).redirect("/");
});

// Rota GET para obter todos os posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Rota PATCH para curtir um post
app.post('/posts/:index/like', (req, res) => {
  const { index } = req.params;
  
  if (index >= 0 && index < posts.length) {
    posts[index].liked = true;
    res.status(201).redirect("/");
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

// Rota PATCH para remover curtida de um post
app.post('/posts/:index/unlike', (req, res) => {
  const { index } = req.params;
  
  if (index >= 0 && index < posts.length) {
    posts[index].liked = false;
    res.status(201).redirect("/");
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

// Function to fetch and process data
async function fetchData() {
  try {
    const response = await axios.get('https://goodbyejohndoe.com/data.json');
    const data = response.data;

    // Helper function to get a random element from an array
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Extract first names, last names, and bios
    const firstNames = data.map(item => item.first);
    const lastNames = data.map(item => item.last);
    const bios = data.map(item => item.bio);

    // Select random elements
    const randomFirstName = getRandomElement(firstNames);
    const randomLastName = getRandomElement(lastNames);
    const randomBio = getRandomElement(bios);

    // Create new author object
    const newAuthor = {
      first: randomFirstName,
      last: randomLastName,
      bio: randomBio
    };
    // Return new author object
    console.log(newAuthor);
    return newAuthor;
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}