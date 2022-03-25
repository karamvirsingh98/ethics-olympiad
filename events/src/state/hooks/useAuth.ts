import { User } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../main";

export default function useAuth() {
  const [user, setUser] = useState<User | false>();

  useEffect(() => {
    client
      .reAuthenticate()
      .then(({ user }) => setUser(user))
      .catch(() => setUser(false));
  }, []);

  const login = async (credentials: {email: string, password: string}) => {
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

  return { user, login, logout };
}
