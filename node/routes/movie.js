
import express from "express";

import {
    updateMovieByName,
    getMovieByName,
    getMovies,
    getMovieById,
    createMovie,
    deleteMovieById,
  } from "../helper.js"

const router = express.Router();


router.get("/", async (request, response) => {
    const filter = request.query;
    if(filter.rating) {
      filter.rating = parseInt(filter.rating);
    }
    const movies = await getMovies(filter);
  
      response.send(movies);
  });
  
  router.put("/", async (request, response) => {
    const { name } = request.query;
  
     await updateMovieByName(name, request);
    const movie = await getMovieByName(name);
    response.send(movie);
  });
  
  router.get("/:id", async (request, response) =>{
    const { id } = request.params;
    const movie = await getMovieById(id);
  
    movie ? response.send(movie) : response.send({message : "no matching movies"});
  });
  
  router.delete("/:id", async (request, response) =>{
    const { id } = request.params;
    const movie = await deleteMovieById(id);
  
     response.send(movie  || {message : "No matching movies"});
  });
  
  router.post("/", async (request, response) =>{
    const data = request.body;
    const result = await createMovie(data); 
  
     response.send (result);
  });
  
  export const movieRouter = router;