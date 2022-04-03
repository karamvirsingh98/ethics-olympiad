import { User } from "@ethics-olympiad/types";
import { CollectionFunctions } from "../../state/hooks/useCollection";
import Divider from "../util/Divider";
import LevelsAccess from "./LevelsAccess";
import UserInfo from "./UserInfo";

export default function UserComponent({
  user,
  functions,
}: {
  user: User;
  functions: CollectionFunctions<User>;
}) {
  const { setOne, setOneField, removeOne } = functions;

  return (
    <div className="grey-flat user">
      <UserInfo user={user} removeOne={removeOne} />
      <Divider vertical />
      <LevelsAccess user={user} setOneField={setOneField} />
    </div>
  );
}
