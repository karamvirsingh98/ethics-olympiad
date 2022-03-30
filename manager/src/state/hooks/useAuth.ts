import { useEffect } from "react";
import { client } from "../../main";
import { User } from "@ethics-olympiad/types";
import { atom, useAtom } from "jotai";

interface Credentials {
  name?: string;
  email: string;
  password: string;
}

type UseAuth = () => {
  user: User | false | undefined;
  login: (credentails: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  createAccount: (
    credentials: Required<Credentials>,
    inviteKey: string
  ) => Promise<void>;
};

export function createUseAuth(): UseAuth {
  const userAtom = atom<User | false | undefined>(undefined);
  return () => {
    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
      client
        .reAuthenticate()
        .then(({ user }) => setUser(user))
        .catch(() => setUser(false));
    }, []);

    const login = async (credentials: Credentials) => {
      try {
        const res = await client.authenticate({
          strategy: "local",
          ...credentials,
        });
        setUser(res.user);
      } catch {
        setUser(false);
        window.alert("Invalid Login Credentials");
      }
    };

    const logout = async () => {
      await client.logout();
      setUser(false);
    };

    const createAccount = async (
      credentials: Required<Credentials>,
      inviteKey: string
    ) => {
      try {
        const user = await client
          .service("api/users")
          .create({ ...credentials, inviteKey });
        setUser(user);
      } catch (err: any) {
        setUser(false);
        window.alert(err.message);
      }
    };

    return { user, login, logout, createAccount };
  };
}
