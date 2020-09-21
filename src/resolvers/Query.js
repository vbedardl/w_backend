import getUserId from "../utils/getUserId";
import userIsCarrier from "../utils/isCarrier";
import userIsAdmin from "../utils/isAdmin";

const Query = {
  users(parent, args, { prisma, request }, info) {
    const isCarrier = userIsCarrier(request);
    const isAdmin = userIsAdmin(request);
    if (!isCarrier && !isAdmin) {
      throw new Error("Carrier or Admin access required");
    }
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(opArgs, info);
  },
  myPackages(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      where: {
        owner: {
          id: userId,
        },
      },
    };
    return prisma.query.packages(opArgs, info);
  },
  packages(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
    };
    opArgs.where = { pickedUp: false };
    return prisma.query.packages(
      opArgs,
      "{id createdAt pickedUp owner {name unit{name}} }"
    );
  },

  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId,
      },
    });
  },
  units(parent, args, { prisma, request }, info) {
    const isCarrier = userIsCarrier(request);
    const isAdmin = userIsAdmin(request);
    if (!isCarrier && !isAdmin) {
      throw new Error("Carrier or Admin access required");
    }
    const opArgs = {
      where: {
        AND: [{ name_not: "Desk" }, { name_not: "Carrier" }],
      },
    };
    return prisma.query.units(opArgs, info);
  },
};

export { Query as default };
