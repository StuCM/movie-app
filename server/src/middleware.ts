import { Cache } from "./types";
import { NextFunction, Request, RequestHandler, Response } from "express";
import rateLimit from "express-rate-limit";

export const limiter: RequestHandler = rateLimit({
  windowMs: 1000 * 60 * 60, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
});

export const cache: Cache = {};

export const cacheMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key: string = req.params.title || "topRatedMovies";

  //check if key exists in cache and if it is less than 24 hours old
  if (cache[key]?.time > Date.now() - 1000 * 60 * 60 * 24) {
    console.log("cache hit")
    return res.json(cache[key].data);
  }

  next();
};
