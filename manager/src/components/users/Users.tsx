import useCollection from "../../state/hooks/useCollection";
import { User } from "../../state/types";

export default function Users({ currentUserID }: { currentUserID: string }) {
  const [users, { removeOne }] = useCollection<User>("users");
  const userIDs = users && Object.keys(users).filter(u => u !== currentUserID)

  return (
    <div>
      {userIDs && userIDs.map(id => <UserComponent user={users[id]} />)}
    </div>
  );
}

function UserComponent({ user }: { user: User }) {
  return (
    <div>
      <div>
        {user.name}
      </div>
      <div>
        {user.email}
      </div>
    </div>
  )
}