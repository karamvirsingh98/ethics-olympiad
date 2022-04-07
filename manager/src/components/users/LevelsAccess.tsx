import { Levels, User } from "@ethics-olympiad/types";
import { client } from "../../main";
import { SetOneField } from "../../state/hooks/useCollection";
import Switch from "../util/Switch";

export default function LevelsAccess({
  user,
  setOneField,
}: {
  user: User;
  setOneField: SetOneField<User>;
}) {
  const levels: Levels[] = ["junior", "middle", "senior", "tertiary"];

  function capitalise(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }
  function formatTemplate(level: string, isNew?: boolean) {
    return `${capitalise(level)} School Cases`;
  }

  const updateUserLevel = (level: Levels) => async () => {
    if (user.permissions?.includes(level)) {
      const permissions = user.permissions.filter((p) => p !== level);
      await client
        .service("api/users")
        .patch(user._id!, {
          permissions,
        })
        .then(console.log);
      setOneField(user._id!, "permissions", permissions);
    } else {
      const permissions = user.permissions
        ? [...user.permissions, level]
        : [level];
      await client
        .service("api/users")
        .patch(user._id!, {
          permissions,
        })
        .then(console.log);
      setOneField(user._id!, "permissions", permissions);
    }
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {levels.map((level, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {formatTemplate(level)}
          <Switch
            active={user.permissions?.includes(level) ? true : false}
            onClick={updateUserLevel(level)}
          />
        </div>
      ))}
    </div>
  );
}
