import { User } from "@ethics-olympiad/types";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../main";
import { Event } from "../../state/types";

export default function Topbar({
  event,
  admin,
}: {
  event: Event;
  admin?: boolean;
}) {
  const navigate = useNavigate();
  // const { eventID } = useParams();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: "0.45rem",
        paddingRight: "3rem",
        gap: "1rem",
      }}
    >
      <button className="blue" onClick={() => navigate(`../`)}>
        Home
      </button>
      {admin && (
        <button className="blue" onClick={() => navigate("../admin")}>
          Admin
        </button>
      )}
      <button
        className="red"
        onClick={async () => {
          await client.logout();
          navigate(`/`);
        }}
      >
        Logout
      </button>
    </div>
  );
}
