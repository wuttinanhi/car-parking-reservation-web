import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "./auth.context";

export function AuthGuard() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext.isLoggedIn) {
    router.push("/login");
  }

  return null;
}
