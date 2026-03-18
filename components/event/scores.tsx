"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { SUBMIT_SCORES_ACTION } from "@/lib/actions/score";
import { Match } from "@/lib/schedule";
import { INIT_SCORE, total_score } from "@/lib/scoring";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

export const Scores = ({
  eventId,
  match,
  allTeams,
}: {
  eventId: number;
  match: Match;
  allTeams: string[];
}) => {
  const [team, setTeam] = useState({ teamA: match.teamA, teamB: match.teamB });
  const [score, setScore] = useState({ teamA: INIT_SCORE, teamB: INIT_SCORE });
  const [honorable, setHonorable] = useState({ teamA: false, teamB: false });

  const update_score = (
    side: "teamA" | "teamB",
    field: keyof typeof INIT_SCORE,
    value: number
  ) =>
    setScore((score) => ({
      ...score,
      [side]: { ...score[side], [field]: value },
    }));

  //   const pusher = usePusher(eventId);
  //   const router = useRouter();
  const { execute, isPending } = useAction(SUBMIT_SCORES_ACTION);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heat {match.heat} Scores</CardTitle>
        <CardAction>
          <Button
            disabled={
              isPending ||
              !team.teamA || //ensure team A is selected
              !team.teamB || // ensure team B is selected
              !Object.values(score.teamA).every((v) => !!v) || // ensure every field of team A score is non 0
              !Object.values(score.teamB).every((v) => !!v) // ensure every field of team B score is non 0
            }
            onClick={() =>
              execute(
                (["teamA", "teamB"] as const).map((side) => ({
                  eventId,
                  team: team[side]!,
                  honorable: honorable[side],
                  ...score[side],
                }))
              )
            }
          >
            Submit Scores
            {isPending ? <Loader2 className="animate-spin" /> : <CheckCircle />}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4">
        {(["teamA", "teamB"] as const).map((side) => (
          <div
            key={side}
            className="w-full flex flex-col gap-4 last:pt-4 last:border-t lg:pr-4 lg:border-r lg:last:pt-0 lg:last:border-t-0 lg:last:pr-0 lg:last:border-none"
          >
            <TeamSelector
              label={side === "teamA" ? "Team A" : "Team B"}
              teams={allTeams}
              value={team[side]}
              onChange={(team) => setTeam((t) => ({ ...t, [side]: team }))}
            />
            <div className="px-4 py-2 border rounded-md border-primary/25 flex flex-col gap-4">
              {(["clarity", "centrality", "thoughtfulness"] as const).map(
                (field) => (
                  <ScoreDots
                    key={field}
                    label={field}
                    score={score[side][field]}
                    onSelect={(score) => update_score(side, field, score)}
                  />
                )
              )}
            </div>
            <div className="px-4 py-2 border rounded-md border-primary/25 flex flex-col gap-4">
              {(["response", "judgeqa"] as const).map((field) => (
                <ScoreSlider
                  key={field}
                  label={field === "judgeqa" ? "Judges Q&A" : field}
                  score={score[side][field]}
                  onChange={(score) => update_score(side, field, score)}
                  max={15}
                />
              ))}
            </div>
            <div className="px-4 py-2 border rounded-md border-primary/25">
              <ScoreSlider
                label={"commentary"}
                score={score[side].commentary}
                onChange={(score) => update_score(side, "commentary", score)}
                max={10}
              />
            </div>
            <div className="px-4 py-2 border rounded-md border-primary/25">
              <ScoreDots
                label={"respectfulness"}
                score={score[side].respectfulness}
                onSelect={(score) =>
                  update_score(side, "respectfulness", score)
                }
              />
            </div>
            <div className="px-4 py-2 border rounded-md border-primary/25 flex items-center justify-between">
              <p>Honorable Mention</p>
              <Checkbox
                className="bg-background"
                checked={honorable[side]}
                onCheckedChange={(checked) =>
                  setHonorable((h) => ({ ...h, [side]: checked }))
                }
              />
            </div>
            <div className="px-4 py-2 bg-primary/5 border rounded-md border-primary/25 flex items-center justify-between">
              <p className="text-xl font-bold">Total Score</p>
              <p className="text-xl font-bold">
                {total_score(score[side])}
                <span className="text-sm text-muted-foreground">/60</span>
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const TeamSelector = ({
  label,
  teams,
  value,
  onChange,
}: {
  label: string;
  teams: string[];
  value: string | undefined;
  onChange: (value: string) => void;
}) => (
  <div className="px-4 py-2 bg-primary/5 border-primary/25 border rounded-md flex items-center justify-between">
    <p className="text-xl font-semibold">{label}</p>
    <Select value={value} onValueChange={(value) => value && onChange(value)}>
      <SelectTrigger className="w-72 bg-background">
        <SelectValue placeholder="Select Team" />
      </SelectTrigger>
      <SelectContent align="end">
        {teams.map((team) => (
          <SelectItem key={team} value={team}>
            {team}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const ScoreDots = ({
  label,
  score,
  onSelect,
}: {
  label: string;
  score: number;
  onSelect: (score: number) => void;
}) => (
  <div className="flex items-center justify-between">
    <div className="capitalize">{label}</div>
    <div className="flex items-center gap-4">
      {Array.from(new Array(5)).map((_, i) => (
        <div
          key={i}
          onClick={() => onSelect(i + 1)}
          className={cn(
            "cursor-pointer size-4 border rounded-full border-primary bg-background",
            i < score && "bg-primary"
          )}
        />
      ))}
      <div className="w-12 text-right">{score}/5</div>
    </div>
  </div>
);

const ScoreSlider = ({
  label,
  score,
  max,
  onChange,
}: {
  label: string;
  score: number;
  max: number;
  onChange: (score: number) => void;
}) => (
  <div className="flex items-center justify-between">
    <div className="capitalize">{label}</div>
    <div className="flex items-center gap-4 w-[50%]">
      <Slider
        value={[score]}
        max={max}
        min={0}
        step={1}
        onValueChange={(value) => onChange(value as number)}
      />
      <div className="w-12 text-right">
        {score}/{max}
      </div>
    </div>
  </div>
);
