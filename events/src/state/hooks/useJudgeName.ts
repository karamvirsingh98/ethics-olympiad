import { useLocalStorage } from "../../util/hooks";

export default function useJudgeName() {
  const [name, set] = useLocalStorage('', 'judge_name')
  return {name, set}
}