import { useLocalStorage, useTheme } from "./util/hooks";
import useAuth from "./state/hooks/useAuth";
import Auth from "./components/auth/Auth";
import AuthHandler from "./components/handlers/AuthHandler";

export default function App() {
  const { user, login, logout, createUser } = useAuth();
  const [dark, set] = useTheme()

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <AuthHandler
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
