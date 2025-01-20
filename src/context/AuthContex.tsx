import { AuthResponse, User } from "@/interfaces/types";
import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";

type Login = {
  email: string;
  password: string;
};
type Register = {
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user?: User;
  token?: string;
  login: (login: Login) => Promise<AuthResponse>;
  register: (register: Register) => void;
  logout: () => void;
};

const authConfig = {
  tokenCookie: "authToken",
  tokenStorage: "authStorage",
  userStorage: "user",
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token =
      localStorage.getItem(authConfig.tokenStorage) ||
      Cookie.get(authConfig.tokenCookie);
    if (token) {
      setToken(token);
    }

    const user = localStorage.getItem(authConfig.userStorage);
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const login = async (login: Login) => {
    const responsive = await axios.post<AuthResponse>("/auth/login", login);
    return responsive.data;
  };

  const register = async (register: Register) => {
    const responsive = await axios.post("/auth/register", register);
    return responsive.data;
  };

  const logout = () => {
    setToken("");
    setUser(undefined);
    localStorage.removeItem(authConfig.tokenStorage);
    localStorage.removeItem(authConfig.userStorage);
    Cookie.remove(authConfig.tokenCookie);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
