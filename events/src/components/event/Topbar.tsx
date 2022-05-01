import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../main";

export default function Topbar({ admin }: { admin?: boolean }) {
  const navigate = useNavigate();
  const params = useParams();

  const logout = async () => {
    await client.logout();
    localStorage.clear();
    navigate(`/`);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: "0.45rem",
        paddingRight: "3rem",
        gap: "1rem",
        zIndex: 999,
      }}
    >
      {params["*"] && (
        <button className="blue" onClick={() => navigate(`.`)}>
          Home
        </button>
      )}
      {admin && (
        <button className="blue" onClick={() => navigate("./admin")}>
          Admin
        </button>
      )}
      <button className="red" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
