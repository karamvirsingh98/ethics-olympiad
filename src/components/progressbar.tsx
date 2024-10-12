"use client";

import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar = () => (
  <AppProgressBar
    height="4px"
    color="hsla(var(--primary))"
    options={{ showSpinner: false }}
    shallowRouting
  />
);
