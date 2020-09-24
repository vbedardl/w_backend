import jwt from "jsonwebtoken";

const userIsAdmin = (request) => {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error("Auth required");
  }
  const token = header.replace("Bearer ", "");
  const decoded = jwt.verify(token, "mysecret");

  return decoded.unitId === "Desk" ? true : false;
};

export { userIsAdmin as default };
