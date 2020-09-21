import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import Package from "./Package";

const resolvers = {
  Query,
  Mutation,
  User,
  Package,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);
export { resolvers, fragmentReplacements };
