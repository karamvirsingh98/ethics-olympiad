import { User } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../main";
import { Event } from "../../state/types";
import { StartButton } from "../admin/subcomponents/Buttons";
import IfElse from "../util/IfElse";

export default function EventSplash({
  event,
  user,
}: {
  event: Event;
  user: User | undefined | false;
}) {
  const navigate = useNavigate();
  const [active, set] = useState();

  useEffect(() => {
    client.service("api/active").get().then(set);
  }, []);

  return (
    <div
      style={{
        fontSize: "4rem",
        placeSelf: "center",
        display: "grid",
        placeItems: "center",
        gap: "2rem",
      }}
    >
      {event.title}
      <div style={{ display: "flex", gap: "1rem" }}>
        <IfElse
          showIf={active ? true : false}
          showTrue={
            <button
              className="green"
              style={{ fontSize: "2rem", padding: "0.5rem 2rem" }}
              onClick={() => navigate("./heat1")}
            >
              Begin!
            </button>
          }
          showFalse={
            <IfElse
              showIf={user ? true : false}
              showTrue={<StartButton eventID={event._id} navigate={navigate} /> }
              showFalse={
                <div style={{ fontSize: "2rem", textAlign: "center" }}>
                  Sorry, this event hasn't begun yet. If you can, please ask the
                  event creator to start it.
                </div>
              }
            />
          }
        />
        {active && user && (
          <button
            className="green"
            style={{ fontSize: "2rem", padding: "0.5rem 2rem" }}
            onClick={() => navigate("./admin")}
          >
            Go to Admin Page
          </button>
        )}
      </div>
    </div>
  );
}
