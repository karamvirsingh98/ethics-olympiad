import { ReactNode } from "react";

export default function RangeGenerator({
  quantity,
  element,
}: {
  quantity: number;
  element: (index: number) => ReactNode;
}) {
  return (
    <>{Array.from(new Array(quantity)).map((_, index) => element(index))}</>
  );
}
