import express, { Application, Request, RequestHandler, Response } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import axios from "axios";
import { ApiResponse, Cache } from "./types";

const app: Application = express();

app.use(cors());

const limiter: RequestHandler = rateLimit({
  windowMs: 1000 * 60 * 60, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
});

const cache: Cache = {}; 

app.get("/search/:title", limiter, async (req: Request, res: Response) => {
  const searchRequest: string = req.params.title as string;
  const apiKey: string = "a8cb1bc9292c540572ecabcd6b268e0f";

  //check if the search is in cache and not older than a day  
  if (cache[searchRequest]?.time > Date.now() - 1000 * 60 * 60 * 24) {
    return res.json(cache[searchRequest].data);
  }

  try {
    const response: ApiResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchRequest}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
    
    cache[searchRequest] = {time: Date.now(), data: response.data.results};
    
    res.json(response.data.results);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred fetching the data"});
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
