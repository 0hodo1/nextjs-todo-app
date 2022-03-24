import { createContext, useEffect } from "react";
import { auth } from "../firebase/index";

export const AuthContext = createContext();

export default function AuthContextProvider({ childeren }) {
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("No user");
        return;
      }
      const token = await user.getIdToken();
      console.log("token", token, "user", user);
    });
  }, []);
}
