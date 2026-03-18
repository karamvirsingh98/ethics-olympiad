export const userRoles = ["admin", "manager", "judge"] as const;
export type UserRole = (typeof userRoles)[number];

export const olympiadLevels = [
  "junior",
  "middle",
  "senior",
  "tertiary",
] as const;
export type OlympiadLevel = (typeof olympiadLevels)[number];
