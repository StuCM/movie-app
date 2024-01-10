import express, { Application, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app: Application = express();

app.use(cors());

app.get("/api", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://www.omdbapi.com/?s=star wars&apikey=a1b5dc0a");
    console.log(response.data.Search)
    res.json(response.data.Search);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred fetching the data"});
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
