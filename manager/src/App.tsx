import { useTheme } from "./util/hooks";
import useAuth from "./state/hooks/useAuth";
import Auth from "./pages/Auth";
import AuthRoutes from "./routes/AuthRoutes";
import PageRoutes from "./routes/PageRoutes";
import { User } from "@ethics-olympiad/types";

export default function App() {
  const { user, login, logout, createAccount } = useAuth();
  const [dark, toggle] = useTheme();

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <AuthRoutes
        user={user}
        isAuth={
          <PageRoutes
            user={user as User}
            logout={logout}
            dark={dark}
            toggleDark={toggle}
          />
        }
        notAuth={<Auth login={login} createAccount={createAccount} />}
      />
    </div>
  );
}
