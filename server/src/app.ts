import express, { Application, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app: Application = express();

app.use(cors());

app.get("/api", async (req: Request, res: Response) => {
  const searchRequest = req.query.search;
  const apiKey = "a8cb1bc9292c540572ecabcd6b268e0f";
  
  console.log("searchRequest", searchRequest)
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchRequest}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
    res.json(response.data.results);
    console.log(response.data.results)
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred fetching the data"});
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
