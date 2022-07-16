import { Score } from "@ethics-olympiad/types";
import { useState } from "react";
import scoresToCSV from "../../../util/csv";

export default function CsvExporter({
  title,
  scores,
}: {
  title: string;
  scores: Score[];
}) {
  const [loading, set] = useState(false);

  const getDate = () => {
    const date = new Date(Date.now());
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  const download = () => {
    // set loading to true
    set(true);

    // generate csv, convert to blob
    const csvScores = scoresToCSV(scores);
    const blob = new Blob([csvScores], { type: "text/csv" });

    // create hidden a-element to use for download
    const elem = window.document.createElement("a");
    elem.style.display = "none";
    elem.href = window.URL.createObjectURL(blob);
    elem.download = `${title}--Scores--${getDate()}`;

    //add to dom and 'click' it to execute download
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

    // set loading to false
    set(false);
  };

  return (
    <button
      onClick={download}
      disabled={loading}
      className={loading ? "orange" : "blue"}
    >
      {loading ? "Working..." : "Export As Spreadsheet"}
    </button>
  );
}
