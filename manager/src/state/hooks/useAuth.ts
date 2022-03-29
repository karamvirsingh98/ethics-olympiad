import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../main";
import { User } from "@ethics-olympiad/types";
import { atom, useAtom } from "jotai";

export function createUseAuth() {
  const userAtom = atom<User | false | undefined>(undefined);
  const navigate = useNavigate();
  return () => {
    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
      client
        .reAuthenticate()
        .then(({ user }) => setUser(user))
        .catch(() => setUser(false));
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
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
        navigate("/");
      } catch (err: any) {
        setUser(false);
        window.alert(err.message);
      }
    };

    return { user, login, logout, createAccount };
  };
}

// export default function useAuth() {
//   const [user, setUser] = useState<User | false>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     client
//       .reAuthenticate()
//       .then(({ user }) => setUser(user))
//       .catch(() => setUser(false));
//   }, []);

//   const login = async (credentials: { email: string; password: string }) => {
//     try {
//       const res = await client.authenticate({
//         strategy: "local",
//         ...credentials,
//       });
//       setUser(res.user);
//     } catch {
//       setUser(false);
//       window.alert("Invalid Login Credentials");
//     }
//   };

//   const logout = async () => {
//     await client.logout();
//     setUser(false);
//   };

//   const createAccount = async (
//     credentials: { name: string; email: string; password: string },
//     inviteKey: string
//   ) => {
//     try {
//       const user = await client
//         .service("api/users")
//         .create({ ...credentials, inviteKey });
//       setUser(user);
//       navigate("/");
//     } catch (err: any) {
//       setUser(false);
//       window.alert(err.message);
//     }
//   };

//   return { user, login, logout, createAccount };
// }
