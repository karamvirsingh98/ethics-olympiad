import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export default function useJudgeName() {
  const judgeNameAtom = atom(localStorage.getItem('judge_name'));
  const [judgeName, setName] = useAtom(judgeNameAtom);
  const saveName = () => {
    localStorage.setItem('judge_name', judgeName!)
  }
  return { judgeName, setName, saveName };
}
