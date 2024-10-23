"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { login } from "../services/actions/login";
import toast from "react-hot-toast";
import { AuthService } from "../services/auth.service";
import { routesRedirectAuth } from "@/lib/routes-redirect";

const schema = z.object({
  username: z.string().min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type FormFields = z.infer<typeof schema>;

export function useLogin() {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await AuthService.getInstance()
      .login({
        username: data.username,
        password: data.password,
      })
      .then(async (res) => {
        const isLogged = await login(res);

        if (!isLogged.ok) {
          toast.error(isLogged.message);
          return;
        }

        toast.success(isLogged.message);
        const redirectPath = routesRedirectAuth[res.user.role];
        window.location.replace(redirectPath);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}
