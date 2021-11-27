import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env);
const app = express();

app.use(express.json())
const PORT = 9000;
const movies = [
  {
    id: "100",
    name: "Paruthiveeran",
    poster: "https://wallpapercave.com/wp/wp6653697.jpg",
    rating: 8.2,
    summary: `A young, carefree man, Paruthiveeran, saves Muththazhagu's life and they eventually fall in love. 
                However, their families object to their union, forcing the couple to elope together.`,
    trailer: "https://www.youtube.com/embed/JdRf57vBEzM",

    language: "Tamil",
  },
  {
    id: "101",
    name: "O Kadhal Kanmani",
    poster: "https://wallpaperaccess.com/full/4343742.jpg",
    rating: 7.4,
    summary: `Two youngsters Adi and Tara are attracted to each other when they meet at a wedding. Since they do not believe in marriage, 
    they decide to live together. What follows forms the crux of the story.`,
    trailer: "https://www.youtube.com/embed/2mBG4vlhcCc",

    language: "English",
  },
  {
    id: "102",
    name: "Karnan",
    poster:
      "https://www.filmibeat.com/ph-big/2021/04/karnan-movie-posters_16179793174.jpg",
    rating: 8.2,
    summary: `A small village in Tamil Nadu is inhabited by people belonging to a lower caste. 
              Karnan, a young man, is revolted by the inhuman treatment given to his villagers and 
              fights for their rights. `,
    trailer: "https://www.youtube.com/embed/pgfUzQ8nzBY",
    language: "Tamil",
  },
  {
    id: "103",
    name: "Madras",
    poster:
      "http://1.bp.blogspot.com/-r5loPw7W1c4/VCr-paAmmpI/AAAAAAAAB2k/pE7ndkU2p5Y/s1600/madras-movie-super-hit-songs-poster.jpg",
    rating: 8,
    summary: `A wall creates discord between two factions of a political party. Kaali and his friend Anbu, 
               who is a political aspirant, get embroiled in the brutal political rivalry. `,
    trailer: "https://www.youtube.com/embed/TZE8iayS_Xk",
    language: "Tamil",
  },
  {
    id: "104",
    name: "Attakathi",
    poster:
      "https://pro2-bar-s3-cdn-cf6.myportfolio.com/9fd5290e2109e08ffd62f3f8f39a7073/7c6b0149172682e89c295881_rw_1200.jpg?h=99403acb4b4c39a6af8500487371adda",
    rating: 7.2,
    summary: `Dinakaran, a college student who becomes the leader of a gang, is unlucky in love. Soon,
                he tries to find true romance in Poornima, a woman who rejected him once before.`,
    trailer: "https://www.youtube.com/embed/ahmdb6yKfaU",
    language: "Tamil",
  },
  {
    id: "105",
    name: "SarpattaParambarai",
    poster: "https://wallpapercave.com/wp/wp9555121.jpg",
    rating: 8.7,
    summary: ` A young man lives in the segregated Madras of the 1970s. When he is presented with 
              the opportunity to revive his boxing career and his clan, 
               he decides to take it but faces challenges in his path.`,
    trailer: "https://www.youtube.com/embed/XTTAHt4VlUA",
    language: "English",
  },
];




// const MONGO_URL = "mongodb://localhost"
const MONGO_URL =  process.env.MONGO_URL; 

// mongodb+srv://raghul:<password>@cluster0.qmnjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://<username>:<password>@cluster0.qmnjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb Connected!!!");
  
  return client;

}

app.get("/", (request, response) => {
  response.send("hello, 🌎!!! 😁😁");
});

app.get("/movies", async (request, response) => {
  console.log(request.query);
  const filter = request.query;
  console.log(filter);
  if(filter.rating) {
    filter.rating = parseInt(filter.rating);
  }
  console.log(filter);
  const client = await createConnection();

  const movies = await client
  .db("b27rwd")
  .collection("movies")
  .find(filter)
  .toArray();

    response.send(movies);
});

app.get("/movies/:id", async (request, response) =>{
  const { id } = request.params;
  const client = await createConnection();

  const movie = await client
  .db("b27rwd")
 .collection("movies")
 .findOne({id: id});

  movie ? response.send(movie) : response.send({message : "no matching movies"});
});

app.post("/movies", async (request, response) =>{
  const data = request.body;
  const client = await createConnection();
  console.log("data", data);
  const result = await client
  .db("b27rwd")
 .collection("movies")
 .insertMany( data ); 

   response.send (result);
});



app.listen(PORT, () => console.log("the server is started in ", PORT));
