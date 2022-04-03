import { Levels, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { client } from "../../main";
import {
  CollectionFunctions,
  SetOneField,
} from "../../state/hooks/useCollection";
import Divider from "../util/Divider";
import Switch from "../util/Switch";

export default function UserComponent({
  user,
  functions,
}: {
  user: User;
  functions: CollectionFunctions<User>;
}) {
  const { setOne, setOneField, removeOne } = functions;
  const [confirm, set] = useState(false);

  const deleteUser = () => {
    if (!confirm) set(true);
    else {
      client.service("api/users").remove(user._id!);
      removeOne(user._id!);
      set(false);
    }
  };

  return (
    <div className="grey-flat user">
      <div style={{ display: "grid", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "2rem" }}>{user.name}</div>
          <button
            className="red"
            style={{ fontSize: "0.8rem" }}
            onClick={deleteUser}
          >
            {confirm ? "Confirm" : "Delete"}
          </button>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          Has Admin Privelidges
          <Switch active={user.admin} onClick={() => {}} />
        </div>
        <EmailAndMemberSince user={user} />
      </div>
      <Divider vertical />
      <LevelsAccess user={user} setOneField={setOneField} />
    </div>
  );
}

function LevelsAccess({
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
      await client.service("api/users").update(user._id!, {
        ...user,
        permissions,
      });
      setOneField(user._id!, "permissions", permissions);
    } else {
      const permissions = user.permissions
        ? [...user.permissions, level]
        : [level];
      await client.service("api/users").update(user._id!, {
        ...user,
        permissions,
      });
      setOneField(user._id!, "permissions", permissions);
    }
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {levels.map((level) => (
        <div
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

function EmailAndMemberSince({ user }: { user: User }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: 0.8,
      }}
    >
      <div>{user.email}</div>
      {user.createdAt && (
        <div style={{ textAlign: "right" }}>
          Member Since: {formatDate(new Date(user.createdAt))}
        </div>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
}
