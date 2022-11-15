import { createContext, useState } from "react";
import { BaseService } from "../../libs/base.service";

export interface IAuthContext {
  isLoggedIn: boolean;
  login: (key: string) => void;
  logout: () => void;
  adminKey: string;
}

export const AuthContext = createContext<IAuthContext>({} as any);

export function AuthProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  function login(key: string) {
    BaseService.testAdminKey(key).then((result) => {
      if (result) {
        setIsLoggedIn(true);
        setAdminKey(key);
        BaseService.setApiKey(key);
      } else {
        alert("Invalid key");
      }
    });
  }

  function logout() {
    setIsLoggedIn(false);
    setAdminKey("");
    BaseService.setApiKey("");
  }

  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        adminKey: adminKey,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
