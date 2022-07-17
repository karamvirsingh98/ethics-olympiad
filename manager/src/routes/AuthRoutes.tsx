import { User } from "@ethics-olympiad/types";
import { Fragment, ReactNode } from "react";
import Loading from "../pages/Loading";

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
