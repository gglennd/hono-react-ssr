import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader({ context: { name } }) {
    if (!name) {
      return { name: "Guest" };
    }

    return { name };
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const [count, setCount] = useState(0);

  return (
    <>
      <p>
        Hello
        {" "}
        {data.name}
      </p>
      <Button onClick={() => setCount(count => count + 1)}>
        count is
        {" "}
        {count}
      </Button>
    </>

  );
}
