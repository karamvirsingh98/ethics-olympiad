"use client";

import { zOlympiadScore } from "@/lib/entities";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useAction } from "next-safe-action/hooks";
import { SubmitResultsAction } from "@/lib/actions";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/navigation";
import { usePusher } from "@/lib/hooks";

const DEFAULT: zOlympiadScore = {
  centrality: 0,
  clarity: 0,
  commentary: 0,
  judge: 0,
  respectfulness: 0,
  response: 0,
  thoughtfulness: 0,
};

export const OlympiadScores = ({
  eventId,
  heat,
  teams,
}: {
  eventId: number;
  heat: number;
  teams: string[];
}) => {
  const [team, setTeam] = useState({ teamA: "", teamB: "" });
  const [score, setScore] = useState({ teamA: DEFAULT, teamB: DEFAULT });
  const [honorable, setHonorable] = useState({ teamA: false, teamB: false });

  const update_score = (
    side: "teamA" | "teamB",
    field: keyof zOlympiadScore,
    value: number
  ) =>
    setScore((score) => ({
      ...score,
      [side]: { ...score[side], [field]: value },
    }));

  const pusher = usePusher(eventId);
  const router = useRouter();
  const { execute, isPending } = useAction(SubmitResultsAction, {
    onSuccess: () => {
      pusher.send_event(
        `client-event-${eventId}-score-submission`,
        "",
        `private-olympiad-${eventId}`
      );
      router.push(`/olympiads/${eventId}`);
    },
  });

  return (
    <div className="p-4 border rounded-md">
      <div className="flex justify-between">
        <p className="px-2 text-3xl font-bold mb-12">Heat {heat} Scores</p>
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
                heat,
                judge: "ur mans",
                team: team[side],
                score: score[side],
                honorable: honorable[side],
              }))
            )
          }
        >
          Submit
          {isPending ? (
            <ReloadIcon className="w-4 ml-4 animate-spin" />
          ) : (
            <CheckCircledIcon className="w-4 ml-4" />
          )}
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {(["teamA", "teamB"] as const).map((side) => (
          <div
            key={side}
            className="w-full flex flex-col gap-4 last:pt-4 last:border-t lg:pr-4 lg:border-r lg:last:pt-0 lg:last:border-t-0 lg:last:pr-0 lg:last:border-none"
          >
            <TeamSelector
              label={side === "teamA" ? "Team A" : "Team B"}
              teams={teams}
              value={team[side]}
              onChange={(team) => setTeam((t) => ({ ...t, [side]: team }))}
            />
            <div className="px-4 py-2 border rounded-md bg-border/50 flex flex-col gap-4">
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
            <div className="px-4 py-2 border rounded-md bg-border/50 flex flex-col gap-4">
              {(["response", "judge"] as const).map((field) => (
                <ScoreSlider
                  key={field}
                  label={field === "judge" ? "Judges Q&A" : field}
                  score={score[side][field]}
                  onChange={(score) => update_score(side, field, score)}
                  max={15}
                />
              ))}
            </div>
            <div className="px-4 py-2 border rounded-md bg-border/50">
              <ScoreSlider
                label={"commentary"}
                score={score[side].commentary}
                onChange={(score) => update_score(side, "commentary", score)}
                max={10}
              />
            </div>
            <div className="px-4 py-2 border rounded-md bg-border/50">
              <ScoreDots
                label={"respectfulness"}
                score={score[side].respectfulness}
                onSelect={(score) =>
                  update_score(side, "respectfulness", score)
                }
              />
            </div>
            <div className="px-4 py-2 border rounded-md bg-border/50 flex items-center justify-between">
              <p>Honorable Mention</p>
              <Checkbox
                className="bg-background"
                checked={honorable[side]}
                onCheckedChange={(state) =>
                  state !== "indeterminate" &&
                  setHonorable((h) => ({ ...h, [side]: state }))
                }
              />
            </div>
            <div className="px-4 py-2 border rounded-md bg-border/50 flex items-center justify-between">
              <p className="text-xl font-bold">Total Score</p>
              <p className="text-xl font-bold">
                {total_score(score[side])}
                <span className="text-sm text-muted-foreground">/60</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const total_score = (score: zOlympiadScore | undefined) => {
  if (!score) return 0;
  return Object.values(score).reduce((sum, num) => (sum += num), 0);
};

const TeamSelector = ({
  label,
  teams,
  value,
  onChange,
}: {
  label: string;
  teams: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="px-4 py-2 bg-border/50 border rounded-md flex items-center justify-between">
    <p className="text-xl font-semibold">{label}</p>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-72 bg-background">
        <SelectValue placeholder="Select Team" />
      </SelectTrigger>
      <SelectContent>
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
            "cursor-pointer w-4 h-4 border rounded-full border-primary bg-background",
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
    <div className="flex items-center gap-4">
      <Slider
        min={0}
        max={max}
        value={[score]}
        onValueChange={(e) => onChange(e[0])}
        className="w-72"
      />
      <div className="w-12 text-right">
        {score}/{max}
      </div>
    </div>
  </div>
);
