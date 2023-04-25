import { Jwt } from "jsonwebtoken";
import { createError } from "./error";

export const varifyToken = () => {
    const token = req.header.token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    Jwt.varify(token, process.env.jwt_secret, (error, user) => {
        if (error) return next(createError(401, "token is not valid"))
        req.user = user
        next()
    })
}

// export const verifyUser = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//       if (req.user.id === req.params.id || req.user.isAdmin) {
//         next();
//       } else {
//         return next(createError(403, "You are not authorized!"));
//       }
//     });
//   };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  