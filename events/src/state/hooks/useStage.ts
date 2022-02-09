import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useStage(stage: number) {
  const navigate = useNavigate()
  
  const next = () => navigate(`../stage${stage === 7 ? 7 : stage + 1}`);

  const back = () => navigate(`../stage${stage === 1 ? 1 : stage - 1}`);

  useEffect(() => {
    const listner = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        back();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", listner);
    return () => window.removeEventListener("keydown", listner);
  }, [stage]);

  return {navigate, next, back}
}