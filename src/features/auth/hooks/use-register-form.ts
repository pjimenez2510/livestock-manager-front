"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { login } from "../services/actions/login";
import toast from "react-hot-toast";
import { AuthService } from "../services/auth.service";
import { UserRole } from "@/features/users/interfaces/user.interface";
import { routesRedirectAuth } from "@/lib/routes-redirect";

const schema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  username: z
    .string()
    .min(5, "El nombre de usuario debe tener mínimo 6 carácteres"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 carácteres"),
  phone: z.string().length(10, "El teléfono debe tener 10 dígitos"),
});

type FormFields = z.infer<typeof schema>;

export function useRegister() {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await AuthService.getInstance()
      .register({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: String(data.phone),
        role: UserRole.User,
      })
      .then(async (res) => {
        const isLogged = await login(res);

        toast.success(isLogged.message);
        const redirectPath = routesRedirectAuth[UserRole.User];
        window.location.replace(redirectPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}
