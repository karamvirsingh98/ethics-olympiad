import { ActiveEvent } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../main";

export default function useActiveEvent(eventID: string) {
  const [active, set] = useState<ActiveEvent | null>();

  useEffect(() => {
    client.service("api/active").get(eventID).then(set);
    client.service("api/active").on("created", set);
    client.service("api/active").on("updated", set);
    client.service("api/active").on("patched", set);
    client.service("api/active").on("removed", set);
    client.service("api/active").on("scored", set);
    return () => {
      client.service("api/active").removeListener("created");
      client.service("api/active").removeListener("updated");
      client.service("api/active").removeListener("patched");
      client.service("api/active").removeListener("removed");
      client.service("api/active").removeListener("scored");
    };
  }, []);

  return active;
}
