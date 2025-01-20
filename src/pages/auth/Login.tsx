import { Box } from "componentsla";
import LoginImage from "@/assets/images/login.png";
import InputFlow from "@/components/ui/InputFlow/InputFlow";
import { Link } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContex";
import { LoginSchema } from "./schemas/login.schema";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    login(data);
  };

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
      <form
        className="w-[250px] flex flex-col justify-center gap-y-4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="w-full space-y-4 flex  flex-col">
          <InputFlow
            label="Email"
            {...register("email")}
            error={errors.email && errors.email.message}
          />
          <InputFlow
            type="password"
            label="Contraseña"
            {...register("password")}
            error={errors.password && errors.password.message}
          />
          <Link
            to="/auth/register"
            className="text-blue-500 w-full flex justify-center"
          >
            Register
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md"
        >
          Login
        </button>
      </form>
    </Box>
  );
}
