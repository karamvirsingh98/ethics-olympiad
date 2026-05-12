export type Match = {
  heat: number;
  judgeId: number;
  teamA: string | undefined;
  teamB: string | undefined;
};

export type ScheduleResult = {
  schedule: Match[];
  // One entry per heat that has teams not present in any complete (teamA +
  // teamB) match. Empty array means every team is paired in every heat.
  unscheduled: Array<{ heat: number; teams: string[] }>;
};

export const computeSchedule = <Team extends string, JudgeId extends number>(
  heats: number,
  teams: Team[],
  judges: JudgeId[]
): ScheduleResult => {
  const schedule: Match[] = [];

  const judgeMap = new Map<JudgeId, Set<Team>>();
  const teamMap = new Map<Team, Set<Team>>();
  const heatMap = new Map<number, Set<Team>>();

  judges.forEach((j) => judgeMap.set(j, new Set()));
  teams.forEach((t) => teamMap.set(t, new Set()));
  for (let heat = 0; heat < heats; heat++) {
    heatMap.set(heat, new Set());
  }

  for (let heat = 0; heat < heats; heat++) {
    judges.forEach((judgeId) => {
      const judgeTeams = judgeMap.get(judgeId)!;
      const heatTeams = heatMap.get(heat)!;

      //   find first eligible team
      const teamA = teams.find(
        (team) => !heatTeams.has(team) && !judgeTeams.has(team)
      );
      if (teamA) {
        heatTeams.add(teamA);
        judgeTeams.add(teamA);
      } else return;

      //   find second eligible team
      const teamB = teams.find(
        (team) =>
          !heatTeams.has(team) &&
          !judgeTeams.has(team) &&
          !teamMap.get(teamA)!.has(team)
      );
      if (teamB) {
        heatTeams.add(teamB);
        judgeTeams.add(teamB);
        teamMap.get(teamA)!.add(teamB);
      }

      // add the match to the schedule
      schedule.push({
        heat: heat + 1,
        judgeId,
        teamA,
        teamB,
      });
    });
  }

  // Compute teams left out per heat. A team only counts as scheduled if it
  // appears in a complete (teamA + teamB) match — a teamA-without-opponent
  // pairing means both that judge and that team have nothing to do.
  const unscheduled: ScheduleResult["unscheduled"] = [];
  for (let h = 1; h <= heats; h++) {
    const scheduled = new Set<string>();
    for (const m of schedule) {
      if (m.heat !== h) continue;
      if (m.teamA !== undefined && m.teamB !== undefined) {
        scheduled.add(m.teamA);
        scheduled.add(m.teamB);
      }
    }
    const leftOut = teams.filter((t) => !scheduled.has(t));
    if (leftOut.length > 0) {
      unscheduled.push({ heat: h, teams: leftOut });
    }
  }

  return { schedule, unscheduled };
};
