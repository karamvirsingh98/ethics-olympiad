import Auth from "./pages/Auth";
import AuthRoutes from "./routes/AuthRoutes";
import PageRoutes from "./routes/PageRoutes";
import { User, Event, Template, Case} from "@ethics-olympiad/types";
import { createUseAuth } from "./state/hooks/useAuth";
import { createUseCollection } from "./state/hooks/useCollection";
import { useTheme } from "./util/hooks";

export const useAuth = createUseAuth();

export const useEvents = createUseCollection<Event>('events')
export const useTemplates = createUseCollection<Template>('templates')
export const useCases = createUseCollection<Case>('cases')

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
