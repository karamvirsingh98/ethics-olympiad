export type Match = {
  heat: number;
  judgeId: number;
  teamA: string | undefined;
  teamB: string | undefined;
};

type Schedule = Array<Match>;

export const computeSchedule = <Team extends string, JudgeId extends number>(
  heats: number,
  teams: Team[],
  judges: JudgeId[]
): Schedule => {
  const schedule: Schedule = [];

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

  return schedule;
};
