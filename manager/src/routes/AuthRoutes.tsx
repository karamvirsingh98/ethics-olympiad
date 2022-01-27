import { Fragment, ReactNode } from "react";
import { User } from "../state/types";

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
  else if (user === undefined) return (
    <div style={{ placeSelf: "center", fontSize: "2rem" }}>Loading...</div>
  );
  else return null
}
