import express, { Application, Request, Response } from "express";
import { limiter, cacheMiddleware, cache } from "./middleware";
import cors from "cors";
import axios from "axios";
import { ApiResponse } from "./types";

const app: Application = express();

app.use(cors());

const apiKey: string = "a8cb1bc9292c540572ecabcd6b268e0f";

app.get("/search/:title", limiter, cacheMiddleware, async (req: Request, res: Response) => {
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

app.get("/topRated", limiter, cacheMiddleware, async (req: Request, res: Response) => {

  try {
    const response: ApiResponse = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?&language=en-US&page=1&api_key=${apiKey}`);

    cache["topRatedMovies"] = {time: Date.now(), data: response.data.results};

    res.json(response.data.results);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred fetching the data"});
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
