import { atom, useAtom } from "jotai";

export default function createUseJudgeName() {
  const judgeNameAtom = atom(localStorage.getItem("judge_name") || "");
  return () => {
    const [judgeName, setName] = useAtom(judgeNameAtom);
    return { judgeName, setName };
  };
}
