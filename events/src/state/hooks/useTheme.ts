import { atom, useAtom } from "jotai";

export default function createUseTheme() {
  const darkAtom = atom(false);
  return () => {
    const [dark, set] = useAtom(darkAtom);
    return {
      dark,
      toggle: () => set(!dark),
    };
  };
}
