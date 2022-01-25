import useCollection from "../../state/hooks/useCollection";
import { User } from "../../state/types";

export default function Users({ currentUserID }: { currentUserID: string }) {
  const [users, { removeOne }] = useCollection<User>("api/users");
  const userIDs = users && Object.keys(users).filter(u => u !== currentUserID)

  return (
    <div>
      {userIDs && userIDs.map(id => <User user={users[id]} />)}
    </div>
  );
}

function User({ user }: { user: User }) {
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