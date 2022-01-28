import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home";

export default function App() {

  return (
    <div className="app">
      <div> Ethics Olympiad </div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:id" element={"hi"}  />
        </Route>
      </Routes>
    </div>
  );
}
