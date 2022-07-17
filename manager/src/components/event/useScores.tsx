import { Event, Score } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../main";

export default function useScores(event: Event) {
  const [scores, setScores] = useState<Score[]>();
  const [loading, setLoading] = useState(false);

  const checkForScores = () => {
    setLoading(true);
    client
      .service("api/scores")
      .find({ query: { eventID: event._id } })
      .then((res: Score[]) => {
        setLoading(false);
        setScores(res);
      });
  };

  useEffect(() => {
    checkForScores();
  }, [event._id]);

  return { scores, loading, checkForScores };
}
