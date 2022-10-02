import { atom, useAtom } from "jotai";

export default function createUseTheme() {
  const darkAtom = atom(localStorage.getItem("dark") === "true");

  return () => {
    const [dark, set] = useAtom(darkAtom);

    const toggle = () => {
      set(!dark);
      localStorage.setItem("dark", dark ? "false" : "true");
    };

    return {
      dark,
      toggle,
    };
  };
}
