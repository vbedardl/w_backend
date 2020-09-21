import jwt from "jsonwebtoken";

const generateToken = (userId, unitId) => {
  return jwt.sign({ userId, unitId }, "mysecret", { expiresIn: "7 days" });
};
export { generateToken as default };
