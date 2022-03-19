import { atom, useAtom } from "jotai";

export default function useJudgeName() {
  const judgeNameAtom = atom(localStorage.getItem("judge_name"));
  const [judgeName, set] = useAtom(judgeNameAtom);
  const setName = (judgeName: string) => {
    set(judgeName)
    localStorage.setItem("judge_name", judgeName)
  }
  return { judgeName, setName };
}
