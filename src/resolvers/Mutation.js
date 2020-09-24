import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import getUserId from "../utils/getUserId";
import hashPassword from "../utils/hashPassword";
import userIsAdmin from "../utils/isAdmin";
import userIsCarrier from "../utils/isCarrier";
import sendOnBoardingEmail from "../utils/sendOnBoardingEmail";
import sendNotificationEmail from "../utils/sendNotificationEmail";

const Mutation = {
  async createUser(parent, args, { prisma, request }, info) {
    const isAdmin = userIsAdmin(request);
    if (!isAdmin) {
      throw new Error("Admin access required");
    }
    const unitId = await prisma.query.units({ where: { name: args.unit } });
    const password = await hashPassword(args.password);
    const user = await prisma.mutation.createUser({
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
    if (!user) {
      throw new Error("User couldnt be created");
    }
    sendOnBoardingEmail(args);
    return user;
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user(
      {
        where: {
          email: args.email,
        },
      },
      "{ id password name unit {name}}"
    );
    if (!user) {
      throw new Error("Unable to login.");
    }
    const isMatch = await bcrypt.compare(args.password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login.");
    }
    return {
      user,
      token: generateToken(user.id, user.unit.name),
    };
  },
  async deleteUser(parent, args, { prisma, request, pubsub }, info) {
    const isAdmin = userIsAdmin(request);
    if (!isAdmin) {
      throw new Error("Admin access required");
    }
    const deletedUser = await prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
    const deletedPackage = await prisma.mutation.deleteManyPackages(
      {
        where: {
          owner: {
            id: args.id,
          },
        },
      },
      info
    );
    return deletedUser;
  },
  async updateUser(parent, args, { prisma, request }, info) {
    //const userId = getUserId(request);

    if (typeof args.password === "string") {
      args.password = await hashPassword(args.password);
    }
    const opArgs = {
      where: { id: args.id },
      data: {},
    };
    if (args.email) {
      opArgs.data.email = args.email;
    }
    if (args.password) {
      opArgs.data.password = args.password;
    }

    return prisma.mutation.updateUser(opArgs, info);
  },
  async createPackage(parent, args, { prisma, request, pubsub }, info) {
    // const isCarrier = userIsCarrier(request);
    // if (!isCarrier) {
    //   throw new Error("Carrier access required");
    // }

    const pack = await prisma.mutation.createPackage(
      {
        data: {
          pickedUp: false,
          owner: {
            connect: {
              id: args.owner,
            },
          },
        },
      },
      info
    );
    const owner = await prisma.query.users({ where: { id: args.owner } });

    if (!pack) {
      throw new Error("Couldnt create a package");
    }
    sendNotificationEmail(owner[0], pack.id);
    return pack;
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
      throw new Error("Unable to delete package.");
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
