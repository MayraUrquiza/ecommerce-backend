import { verifyToken } from "../utils/jwt.js";

const authenticate = async (req, res, next) => {
  try {
    const authorization =
      req.headers["authorization"] || req.headers["Authorization"];

    if (!authorization) {
      return res.status(401).json({
        status: 401,
        description: "Se requiere autenticación para acceder a este recurso",
        error: "Header authorization o Authorization no encontrado",
      });
    }

    const token = authorization.split(" ")[1];

    const result = verifyToken(token);

    if (!result.user) res.status(result.status).json(result);
    else {
      req.user = result.user;
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default authenticate;
