import { OlympiadEvent } from "../state/types";

export default function EventComponent({ event }: { event?: OlympiadEvent }) {
  return (
    <div className="page">
      <div style={{ fontSize: "2rem", borderBottom: "0.25rem solid black" }}>
        Haboda Skeepoda Ethics Olympiad
      </div>
    </div>
  );
}
