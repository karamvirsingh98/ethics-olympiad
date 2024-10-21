"use client";

import { useEffect, useState } from "react";

export const LocaleDateString = (props: {
  date: Date;
  //   formatter: (date: Date) => string;
}) => {
  const [date, set] = useState<Date>();

  useEffect(() => {
    set(props.date);
  }, []);

  if (!date) return null;
  return <>{date.toLocaleDateString()}</>;
};
