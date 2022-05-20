import { ScoreFields, TeamScore } from "@ethics-olympiad/types";
import { Fragment, useState } from "react";
import Divider from "../../../util/Divider";

export default function ScoreExplainer({
  label,
}: {
  label: keyof ScoreFields;
}) {
  const [show, setShow] = useState(false);

  const toggle = (show: boolean) => () => setShow(show);

  function capitalise(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  function format(label: keyof TeamScore) {
    if (label === "judgeResponse") return "Judge Q&A Response";
    else if (label === "response") return "Commentary Response";
    else return capitalise(label);
  }

  const map = Array.from(new Array(Guidelines[label].range.length));

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={toggle(true)}
      onMouseLeave={toggle(false)}
    >
      <div style={{ fontSize: "1.25rem" }}> {format(label)} </div>
      {show && (
        <div className="grey-solid dark hovermenu">
          <div style={{ fontSize: "1.5rem" }}> Guidelines: </div>
          <div className="score-explainers">
            <div style={{ display: "grid", gap: "1rem" }}>
              {map.map((_, i) => (
                <Fragment key={i}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3rem 1fr",
                      alignItems: "center",
                    }}
                  >
                    <div> {Guidelines[label].range[i]} </div>
                    <div> {Guidelines[label].explainers[i]} </div>
                  </div>
                  {i + 1 !== Guidelines[label].range.length && <Divider />}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Guidelines: Record<
  keyof ScoreFields,
  { range: string[]; explainers: string[] }
> = {
  clarity: {
    range: ["5", "4", "3", "2", "1"],
    explainers: [
      "Extremely clear presentation that systematically addressed the key dimensions of the question.",
      "Reasonably clear presentation that systematically addressed most key dimensions of the question",
      "Hard to follow the argument. Significant dimensions of the question missed (passable).",
      "Serious logical problems or underdeveloped argument (poor)",
      "Incoherent presentation.",
    ],
  },
  centrality: {
    range: ["5", "4", "3", "2", "1"],
    explainers: [
      "Clearly and precisely identified central moral dimensions, and discussed these dimensions thoroughly.",
      "Mostly identified central moral dimensions and discussed major issues.",
      "Adequately identified and discussed some central moral dimensions (passable)",
      "Misidentified some moral dimensions of the case and inadequately discussed (poor)",
      "Misidentified the central moral dimensions",
    ],
  },
  thoughtfulness: {
    range: ["5", "4", "3", "2", "1"],
    explainers: [
      "Insightful analysis and discussion of the most significant viewpoints, including full and careful attention to opposing points of view.",
      "Solid analysis and discussion of some different viewpoints.",
      "Underdeveloped discussion of different viewpoints (passable).",
      "Minimal consideration of different viewpoints (poor).",
      "Minimal awareness of different viewpoints.",
    ],
  },
  commentary: {
    range: ["10", "8-9", "6-7", "3-5", "1-2"],
    explainers: [
      "Especially insightful, complete, and composed commentary.",
      "Key points excellently addressed.",
      "Solid response to presenting team's points.",
      "Some points made, but few insights or constructive ideas (passable).",
      "Weak or irrelevant response or merely asking a series of questions (poor).",
    ],
  },
  response: {
    range: ["15", "12-14", "9-11", "6-8", "5-1"],
    explainers: [
      "Especially insightful, complete, and composed response.",
      "Key points are excellently addressed.",
      "Solid response to commenting team.",
      "Some relevant points are made (passable)",
      "Weak or irrelevant response (poor).",
    ],
  },
  judgeResponse: {
    range: ["15", "14", "12-13", "10-11", "1-10"],
    explainers: [
      "Especially insightful, complete, and composed response.",
      "The most pressing points are identified and discussed.",
      "Several of the most important points are identified and discussed.",
      "Some relevant points are made (passable).",
      "Weak or irrelevant response (poor).",
    ],
  },
  respectful: {
    range: ["5", "4", "3", "2", "1"],
    explainers: [
      "Respectfully engaged all parties in exceptionally productive and collaborative discussion.",
      "Respectfully engaged other team's arguments and points.",
      "Respectful of other team's argument but only marginal engagement and pursuit.",
      "Unengaged with other team's arguments.",
      "Combative or dismissive of other team's arguments.",
    ],
  },
};
