import InputFlow from "@/components/ui/InputFlow/InputFlow";
import { Box } from "componentsla";
import RegisterImage from "@/assets/images/register.png";
import { Link } from "react-router";

export default function Register() {
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
          src={RegisterImage}
          alt="register"
          className="w-auto h-1/2 object-cover"
        />
      </div>
      <form className="w-[250px] flex flex-col justify-center gap-y-8 items-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <div className="w-full space-y-4 flex  flex-col">
          <InputFlow label="Username" />
          <InputFlow label="Email" />
          <InputFlow label="Contraseña" />{" "}
          <Link
            to="/auth/register"
            className="text-blue-500 w-full flex justify-center"
          >
            Login
          </Link>
        </div>

        <button className="w-full p-2  bg-blue-500 text-white rounded-md">
          Register
        </button>
      </form>
    </Box>
  );
}
