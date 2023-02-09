import { RateLimiter } from "limiter";
import { defineEventHandler, getRequestHeader } from "h3";
import cache from "memory-cache";
import { $st } from "../i18n/lib";

// THIS RATE LIMITER ALLOWS 10 REQUESTS EVERY 15 SECONDS
export default defineEventHandler(async (event) => {
  if (event.node.req.url?.includes("/api/")) {
    const ip = getRequestHeader(event, "x-forwarded-for");

    if (!cache.get(ip)) {
      const cachedLimiter = new RateLimiter({
        interval: 15000,
        tokensPerInterval: 9,
        fireImmediately: false,
      });

      cache.put(ip, cachedLimiter, 15000);
    } else {
      const cachedLimiter = cache.get(ip) as RateLimiter;

      if (Math.floor(cachedLimiter.getTokensRemaining()) > 1) {
        await cachedLimiter.removeTokens(1);

        cache.put(ip, cachedLimiter, 15000);
      } else {
        event.node.res.statusCode = 429;

        return {
          message: $st("alerts.too_many_requests"),
        };
      }
    }
  }
});
