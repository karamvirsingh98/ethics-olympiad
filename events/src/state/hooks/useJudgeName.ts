import { atom, useAtom } from "jotai";

export default function createUseJudgeName() {
  const judgeNameAtom = atom(localStorage.getItem("judge_name") || "");
  return () => {
    const [judgeName, setName] = useAtom(judgeNameAtom);
    const saveName = () => {
      localStorage.setItem("judge_name", judgeName!);
    };
    return { judgeName, setName, saveName };
  };
}
