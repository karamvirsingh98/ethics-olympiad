import { useLocalStorage } from "./util/hooks";
import AuthManager from "./components/util/AuthManager";
import Login from "./components/auth/Login";
import PageManager from "./components/pages/PageManager";
import { User } from "./state/types";
import useAuth from "./state/hooks/useAuth";
import Auth from "./components/auth/Auth";

export default function App() {
  const { user, login, logout, createUser } = useAuth();
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark");

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <AuthManager
        user={user}
        isAuth={
          "hi"
          // <PageManager
          //   user={user as User}
          //   logout={logout}
          //   dark={dark}
          //   toggleDark={() => set(!dark)}
          // />
        }
        notAuth={<Auth login={login} createAccount={createUser} />}
      />
    </div>
  );
}
