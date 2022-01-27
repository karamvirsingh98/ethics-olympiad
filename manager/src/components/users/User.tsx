import { User } from "../../state/types";

export default function UserComponent({ user }: { user: User }) {
  return (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
}
