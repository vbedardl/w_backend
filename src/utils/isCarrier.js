import jwt from "jsonwebtoken";

const userIsCarrier = (request) => {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error("Auth required");
  }
  const token = header.replace("Bearer ", "");
  const decoded = jwt.verify(token, "mysecret");

  return decoded.unitId === "Carrier" ? true : false;
};

export { userIsCarrier as default };
