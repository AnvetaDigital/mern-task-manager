import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config({ path: "../.env" });


const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default auth;
