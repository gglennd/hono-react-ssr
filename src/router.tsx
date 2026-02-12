import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    context: {
      name: null,
    },
    defaultPreload: "intent",
    scrollRestoration: true,
  });

  return router;
}
