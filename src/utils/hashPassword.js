import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error("Must be 8 characters of longer.");
  }

  return bcrypt.hash(password, 10);
};

export { hashPassword as default };
