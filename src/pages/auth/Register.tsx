import InputFlow from "@/components/ui/InputFlow/InputFlow";
import { Box } from "componentsla";
import RegisterImage from "@/assets/images/register.png";
import { Link } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schemas/register.schema";
import { RegisterType } from "./types";
import { useAuth } from "@/context/AuthContex";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const { register: registerAuth } = useAuth();

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    // console.log(data);
    registerAuth(data);
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
          src={RegisterImage}
          alt="register"
          className="w-auto h-1/2 object-cover"
        />
      </div>
      <form
        className="w-[250px] flex flex-col justify-center gap-y-8 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Register</h1>
        <div className="w-full space-y-4 flex  flex-col">
          <InputFlow
            label="Username"
            {...register("username")}
            error={errors.username && errors.username.message}
          />
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
          />{" "}
          <Link
            to="/auth/login"
            className="text-blue-500 w-full flex justify-center"
          >
            Login
          </Link>
        </div>

        <button
          type="submit"
          className="w-full p-2  bg-blue-500 text-white rounded-md"
        >
          Register
        </button>
      </form>
    </Box>
  );
}
