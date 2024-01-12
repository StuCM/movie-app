"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const apiKey = process.env.API_KEY;
app.get("/api/search/:title", middleware_1.limiter, middleware_1.cacheMiddleware, async (req, res) => {
    const searchRequest = req.params.title;
    try {
        const response = await axios_1.default.get(`https://api.themoviedb.org/3/search/movie?query=${searchRequest}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
        middleware_1.cache[searchRequest] = { time: Date.now(), data: response.data.results };
        res.json(response.data.results);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred fetching the data" });
    }
});
app.get("/api/topRated", middleware_1.limiter, middleware_1.cacheMiddleware, async (req, res) => {
    try {
        const response = await axios_1.default.get(`https://api.themoviedb.org/3/movie/top_rated?&language=en-US&page=1&api_key=${apiKey}`);
        middleware_1.cache["topRatedMovies"] = { time: Date.now(), data: response.data.results };
        res.json(response.data.results);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred fetching the data" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=app.js.map