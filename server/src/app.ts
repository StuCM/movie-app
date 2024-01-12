import express, { Application, Request, Response } from "express";
import { limiter, cacheMiddleware, cache } from "./middleware";
import cors from "cors";
import axios from "axios";
import { ApiResponse } from "./types";
require("dotenv").config();

const app: Application = express();

app.use(cors());

const apiKey: string = process.env.API_KEY as string;

app.get("/api/search/:title", limiter, cacheMiddleware, async (req: Request, res: Response) => {
  const searchRequest: string = req.params.title as string;

  try {
    const response: ApiResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchRequest}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
    
    cache[searchRequest] = {time: Date.now(), data: response.data.results};
    
    res.json(response.data.results);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred fetching the data"});
  }
});

app.get("/api/topRated", limiter, cacheMiddleware, async (req: Request, res: Response) => {

  try {
    const response: ApiResponse = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?&language=en-US&page=1&api_key=${apiKey}`);

    cache["topRatedMovies"] = {time: Date.now(), data: response.data.results};

    res.json(response.data.results);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred fetching the data"});
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
