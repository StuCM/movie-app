"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = exports.cache = exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 1000 * 60 * 60, // 1 hour
    max: 100, // limit each IP to 100 requests per windowMs
});
exports.cache = {};
const cacheMiddleware = (req, res, next) => {
    const key = req.params.title || "topRatedMovies";
    //check if key exists in cache and if it is less than 24 hours old
    if (exports.cache[key]?.time > Date.now() - 1000 * 60 * 60 * 24) {
        console.log("cache hit");
        return res.json(exports.cache[key].data);
    }
    next();
};
exports.cacheMiddleware = cacheMiddleware;
//# sourceMappingURL=middleware.js.map