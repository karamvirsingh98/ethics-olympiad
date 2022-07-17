import { Event, Score, Template } from "@ethics-olympiad/types";
import ArrayMap from "../../util/ArrayMap";
import RangeGenerator from "../../util/RangeGenerator";
import useScores from "../useScores";

export default function ScoresV2({
  template,
  event,
}: {
  template: Template;
  event: Event;
}) {
  const heats = template.heats.length;
  const { scores, loading, checkForScores } = useScores(event);

  return (
    <table>
      <ScoresV2Header heats={heats} />
      <TotalScores heats={heats} event={event} scores={scores} />
    </table>
  );
}

function TotalScores({
  heats,
  event,
  scores,
}: {
  heats: number;
  event: Event;
  scores?: Score[];
}) {
  return (
    <ArrayMap
      array={event.teams}
      map={({ teamName }, i) => (
        <tr key={i}>
          <td> {teamName} </td>
          <RangeGenerator
            quantity={heats}
            element={(index) => (
              <td key={index}>
                <TotalScore
                  teamName={teamName}
                  heat={index + 1}
                  scores={scores}
                />
              </td>
            )}
          />
        </tr>
      )}
    />
  );
}

function TotalScore({
  teamName,
  heat,
  scores,
}: {
  teamName: string;
  heat: number;
  scores?: Score[];
}) {
  if (!scores) return null;

  const score = scores?.find(
    ({ heatNumber, teamA, teamB }) =>
      heatNumber === heat && (teamA === teamName || teamB === teamName)
  );

  if (!score) return null;

  return (
    <>
      {Object.values(
        score.teamA === teamName ? score.scoreA : score.scoreB
      ).reduce((total, next) => total + next, 0)}
    </>
  );
}

function ScoresV2Header({ heats }: { heats: number }) {
  return (
    <tr>
      <th> Teams </th>
      <RangeGenerator
        quantity={heats}
        element={(index) => <th key={index}>Heat {index + 1}</th>}
      />
    </tr>
  );
}
