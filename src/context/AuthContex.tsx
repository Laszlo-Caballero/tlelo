import { AuthResponse, User } from "@/interfaces/types";
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { Toast } from "componentsla";
import { apiUrl } from "@/config/apiUrl";
import { authConfig } from "@/config/config";
import { useNavigate } from "react-router";
import isEmpty from "@/libs/is-empty";

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
  isAuth: boolean;
  login: (login: Login) => void;
  register: (register: Register) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const toast = Toast();
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const url = apiUrl.back;

  useEffect(() => {
    const token =
      localStorage.getItem(authConfig.tokenStorage) ||
      Cookie.get(authConfig.tokenCookie) ||
      "";
    const user = localStorage.getItem(authConfig.userStorage) ?? "";

    console.log(token, user);

    if (!isEmpty(token) && !isEmpty(user)) {
      setUser(JSON.parse(user));
      setToken(token);
      setIsAuth(true);
    }
  }, []);

  const login = async (login: Login) => {
    try {
      const responsive = await axios.post<AuthResponse>(
        `${url}/auth/login`,
        login
      );

      const data = responsive.data;

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      setToken(data.token);
      setUser(data.data);
      setIsAuth(true);
      localStorage.setItem(authConfig.tokenStorage, data.token);
      localStorage.setItem(authConfig.userStorage, JSON.stringify(data.data));
      Cookie.set(authConfig.tokenCookie, data.token);
      toast.success(`Bienvenido ${data.data.username}`);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión");
    }
  };

  const register = async (register: Register) => {
    try {
      const responsive = await axios.post(`${url}/auth/register`, register);
      const data = responsive.data;

      if (data.status !== 200) {
        throw new Error(data.message);
      }
      setToken(data.token);
      setUser(data.data);
      setIsAuth(true);

      localStorage.setItem(authConfig.tokenStorage, data.token);
      localStorage.setItem(authConfig.userStorage, JSON.stringify(data.data));
      Cookie.set(authConfig.tokenCookie, data.token);
      toast.success("Registrado correctamente");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error al registrarse");
    }
  };

  const logout = () => {
    setToken("");
    setUser(undefined);
    localStorage.removeItem(authConfig.tokenStorage);
    localStorage.removeItem(authConfig.userStorage);
    Cookie.remove(authConfig.tokenCookie);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuth, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
