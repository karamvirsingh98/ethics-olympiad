import { useEffect, useState } from "react";
import { client } from "../..";
import { User } from "../types";

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

  const createAccount = async (
    credentials: { name: string; email: string; password: string },
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
}
