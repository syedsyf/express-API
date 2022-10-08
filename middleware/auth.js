import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    res.status(401).send({err: err.message});
  }
};

export default auth;
