import { User } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJudgeName } from "../../App";
import { client } from "../../main";
import useActiveEvent from "../../state/hooks/useActiveEvent";
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
  const { activeEvent } = useActiveEvent(event._id);
  const { judgeName } = useJudgeName();

  //TODO refactor these three things into a single hook, and use to have a much stronger control flow on the application
  const [scored, set] = useState<number>();

  useEffect(() => {
    set(activeEvent?.scores[judgeName] || 0);
  }, [activeEvent]);

  const getColor = (i: number) => {
    if (scored !== undefined) {
      if (i < scored) return "green";
      else if (i > scored) return "red";
      else return "blue";
    } else return "grey";
  };

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
          showIf={activeEvent ? true : false}
          showTrue={
            <>
              {event.heats.map((_, i) => (
                <button
                  key={i}
                  className={getColor(i)}
                  disabled={
                    !activeEvent ||
                    getColor(i) === "red" ||
                    getColor(i) === "green"
                  }
                  onClick={() => navigate(`./heat${i + 1}`)}
                  style={{
                    fontSize: "1.5rem",
                    padding: "0.5rem 2rem",
                    cursor:
                      !activeEvent ||
                      getColor(i) === "red" ||
                      getColor(i) === "green"
                        ? "not-allowed"
                        : undefined,
                  }}
                >
                  Heat {i + 1}
                </button>
              ))}
              <button
                className="orange"
                style={{ fontSize: "1.5rem", padding: "0.5rem 2rem" }}
                onClick={() => navigate("./scores")}
              >
                Scores
              </button>
            </>
          }
          showFalse={
            <IfElse
              showIf={user ? true : false}
              showTrue={<StartButton eventID={event._id} navigate={navigate} />}
              showFalse={
                <div style={{ fontSize: "2rem", textAlign: "center" }}>
                  Sorry, this event hasn't begun yet. If you can, please ask the
                  event creator to start it.
                </div>
              }
            />
          }
        />
        {activeEvent && user && (
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
