import { Route, Routes } from "react-router";
import Login from "../../pages/auth/Login";
import { Box } from "componentsla";
import BgLogin from "@/assets/images/bglogin.png";
import Register from "@/pages/auth/Register";

export default function AuthRoute() {
  return (
    <Box
      component="main"
      display="flex"
      className="h-screen flex-1 relative overflow-hidden"
    >
      <img
        src={BgLogin}
        alt="BgLogin"
        className="absolute -translate-y-[30%] -translate-x-1/2 inset-0 w-auto h-[400px] object-cover"
      />

      <img
        src={BgLogin}
        alt="BgLogin"
        className="absolute bottom-0 right-0 rotate-180 translate-x-1/2 translate-y-[30%] w-auto h-[400px] object-cover"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
}
