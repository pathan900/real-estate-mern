import jwt from "jsonwebtoken";
import { erroHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(erroHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(erroHandler(403, "Forbidden"));
    }
    req.user = user;
    next();
  });
};
