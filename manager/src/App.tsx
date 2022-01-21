import { useAuth } from "./state/hooks";
import { useLocalStorage } from "./util/hooks";
import AuthManager from "./components/util/AuthManager";
import Login from "./components/auth/Login";
import PageManager from "./components/pages/PageManager";
import { User } from "./state/types";

export default function App() {
  const { user, login, logout } = useAuth()
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark");

  console.log('user', user)

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <AuthManager
        user={user}
        isAuth={ <PageManager user={user as User} logout={logout} dark={dark} toggleDark={() => set(!dark)}  /> }
        notAuth={<Login login={login} />}
      />
    </div>
  );
}
