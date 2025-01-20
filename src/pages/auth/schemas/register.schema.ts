import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
});
