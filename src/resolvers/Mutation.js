import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import getUserId from "../utils/getUserId";
import hashPassword from "../utils/hashPassword";
import userIsAdmin from "../utils/isAdmin";
import userIsCarrier from "../utils/isCarrier";

const Mutation = {
  async createUser(parent, args, { prisma, request }, info) {
    const isAdmin = userIsAdmin(request);
    if (!isAdmin) {
      throw new Error("Admin access required");
    }
    const unitId = await prisma.query.units({ where: { name: args.unit } });
    const password = await hashPassword(args.password);
    return prisma.mutation.createUser({
      data: {
        ...args,
        password,
        unit: {
          connect: {
            id: unitId[0].id,
          },
        },
      },
    });
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user(
      {
        where: {
          email: args.data.email,
        },
      },
      "{ id password name unit {name}}"
    );
    if (!user) {
      throw new Error("Unable to login.");
    }
    const isMatch = bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login.");
    }
    console.log("user unit:", user.unit);
    return {
      user,
      token: generateToken(user.id, user.unit.name),
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const isAdmin = userIsAdmin(request);
    if (!isAdmin) {
      throw new Error("Admin access required");
    }
    return prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }
    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
  async createPackage(parent, args, { prisma, request }, info) {
    const isCarrier = userIsCarrier(request);
    if (!isCarrier) {
      throw new Error("Carrier access required");
    }

    return prisma.mutation.createPackage(
      {
        data: {
          pickedUp: false,
          owner: {
            connect: {
              id: args.data.owner,
            },
          },
        },
      },
      info
    );
  },
  async deletePackage(parent, args, { prisma, request }, info) {
    const isCarrier = userIsCarrier(request);
    if (!isCarrier) {
      throw new Error("Carrier access required");
    }
    const packageExists = await prisma.exists.Package({
      id: args.id,
      owner: {
        id: args.data.owner,
      },
    });
    if (!packageExists) {
      throw new Error("Unable to delete post.");
    }

    return prisma.mutation.deletePackage(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updatePackage(parent, args, { prisma, request }, info) {
    const isAdmin = userIsAdmin(request);
    if (!isAdmin) {
      throw new Error("Admin access required");
    }
    const packageExists = await prisma.exists.Package({
      id: args.id,
    });

    if (!packageExists) {
      throw new Error("Unable to update package.");
    }
    return prisma.mutation.updatePackage(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
};

export { Mutation as default };
