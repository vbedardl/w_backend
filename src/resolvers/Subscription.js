const Subscription = {
  package: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("Package");
    },
  },
};

export { Subscription as default };
