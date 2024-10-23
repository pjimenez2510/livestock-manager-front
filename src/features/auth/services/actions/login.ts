"use server";

import { signIn } from "@/auth.config";
import { AuthReponse } from "../../interfaces/auth.interface";

export const login = async (params: AuthReponse) => {
  try {
    await signIn("credentials", {
      id: params.user.id,
      firstName: params.user.firstName,
      lastName: params.user.lastName,
      username: params.user.username,
      email: params.user.email,
      role: params.user.role,
      accessToken: params.access_token,
      redirect: false,
    });
    return { ok: true, message: "Inicio de sesión exitoso" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al iniciar sesión" };
  }
};
