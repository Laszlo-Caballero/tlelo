import { Box } from "componentsla";
import LoginImage from "@/assets/images/login.png";
import InputFlow from "@/components/ui/InputFlow/InputFlow";

export default function Login() {
  return (
    <Box
      component="main"
      className=" w-full h-full gap-x-8"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <div className=" justify-end flex items-center">
        <img
          src={LoginImage}
          alt="Login"
          className="w-auto h-1/2 object-cover"
        />
      </div>
      <form className="w-[250px] flex flex-col justify-center gap-y-8 items-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="w-full space-y-4">
          <InputFlow label="Email" />
          <InputFlow label="Contraseña" />
        </div>

        <button className="w-full p-2 my-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>
    </Box>
  );
}
