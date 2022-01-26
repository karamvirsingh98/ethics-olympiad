import { useTheme } from "./util/hooks";
import useAuth from "./state/hooks/useAuth";
import Auth from "./pages/Auth";
import AuthHandler from "./handlers/AuthHandler";
import PageHandler from "./handlers/PageHandler";
import { User } from "./state/types";

export default function App() {
  const { user, login, logout, createAccount } = useAuth();
  const [dark, toggle] = useTheme()

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <AuthHandler
        user={user}
        isAuth={
          <PageHandler
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
