import { createRequestHandler, defaultStreamHandler } from "@tanstack/react-router/ssr/server";
import { Hono } from "hono";

import type { Context } from "./context";

import { getRouter } from "./router";

const app = new Hono<{ Variables: Context }>()
  .on(["GET"], "/", async (c, next) => {
    c.set("name", "John Doe");
    await next();
  })
  .all("*", async (c) => {
    const name = c.get("name");

    const handler = createRequestHandler({
      request: c.req.raw,
      createRouter: () => {
        const router = getRouter();

        router.update({
          context: {
            ...router.options.context,
            name,
          },
        });

        return router;
      },
    });

    return await handler(defaultStreamHandler);
  });

export default app;
