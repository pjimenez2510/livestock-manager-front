"use client";

import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

export function useLogout() {
  const onLogout = async () => {
    await signOut();
    toast.success("Sesión cerrada exitosamente");
    window.location.replace("/login");
  };

  return { onLogout };
}
