import incrementalCache from "@opennextjs/cloudflare/kv-cache";
import memoryQueue from "@opennextjs/cloudflare/memory-queue";

const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: () => incrementalCache,
      tagCache: "dummy",
      queue: () => memoryQueue,
    },
  },

  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

export default config;
