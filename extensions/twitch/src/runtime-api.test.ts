import { describe, expect, it } from "vitest";

describe("twitch runtime-api", () => {
  it("re-exports the runtime helpers used by Twitch internals", async () => {
    const runtimeApi = await import("../runtime-api.js");

    expect(runtimeApi.DEFAULT_ACCOUNT_ID).toBe("default");
    expect(runtimeApi.MarkdownConfigSchema).toBeDefined();
    expect(typeof runtimeApi.buildChannelConfigSchema).toBe("function");
    expect(typeof runtimeApi.createReplyPrefixOptions).toBe("function");
    expect(typeof runtimeApi.normalizeAccountId).toBe("function");
  });
});
