import { Routes, Route, useParams } from "react-router-dom"
import Event from "./components/event/Event";
import Home from "./components/pages/Home";

export default function App() {
  return (
    <div className="app light">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":eventID" element={<Event />} />
      </Routes>
    </div>
  );
}
