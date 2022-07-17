import { User } from "@ethics-olympiad/types";
import { Fragment, ReactNode } from "react";

export default function AuthRoutes({
  user,
  isAuth,
  notAuth,
}: {
  user: User | false | undefined;
  isAuth: ReactNode;
  notAuth: ReactNode;
}) {
  if (user) return <Fragment> {isAuth} </Fragment>;
  else if (user === false) return <Fragment> {notAuth} </Fragment>;
  else if (user === undefined) return <Loading />;
  else return null;
}

function Loading() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        fontSize: "2rem",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        Loading...
        <div className="spinner" />
      </div>
    </div>
  );
}
