import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_PRIVATE_KEY } from "../config.js";
import CustomError from "./CustomError.js";

export const generateToken = (data) => {
  return jwt.sign({ ...data }, JWT_PRIVATE_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  if (!token) {
    return new CustomError(
      401,
      "Se requiere autenticacion para acceder a este recurso",
      "Formato de token inválido"
    );
  }

  try {
    const user = jwt.verify(token, JWT_PRIVATE_KEY);
    return { user };
  } catch (err) {
    if (err.message === "jwt expired")
      return new CustomError(403, "El token ha expirado", "Token inválido");

    if (err.message === "jwt malformed")
      return new CustomError(
        403,
        "El formato del token es incorrecto",
        "Token inválido"
      );
    return new CustomError(
      403,
      "Nivel de acceso insuficiente para el recurso solicitado",
      "Token inválido"
    );
  }
};
