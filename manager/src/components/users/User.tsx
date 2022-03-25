import { User } from "@ethics-olympiad/types";

export default function UserComponent({ user }: { user: User }) {
  return (
    <div className="grey-flat user">
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          placeItems: "center start",
        }}
      >
        <div style={{ fontSize: "2rem" }}>{user.name}</div>
        <div>{user.admin ? "Is Admin" : ""}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: 0.8
        }}
      >
        <div>{user.email}</div>
        {user.createdAt && (
          <div style={{ textAlign: "right" }}>
            Member Since: {formatDate(new Date(user.createdAt))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
}
