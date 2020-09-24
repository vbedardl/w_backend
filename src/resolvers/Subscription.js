const Subscription = {
  package: {
    subscribe(parent, { userId }, { prisma, pubsub }, info) {
      return pubsub.asyncIterator("package");
    },
  },
};

export { Subscription as default };
