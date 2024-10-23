"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFInput from "@/components/rhf/RHFInput";
import RHFPasswordInput from "@/components/rhf/RHFPasswordInput";
import { useLogin } from "../../hooks/user-login-form";
import Link from "next/link";

const LoginForm = () => {
  const { methods, onSubmit, isSubmiting } = useLogin();

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center gap-3 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="w-full md:max-w-sm">
            <RHFInput name="username" label="Nombre de usuario" />
            <RHFPasswordInput name="password" label="Contraseña" />
          </div>
          <Button disabled={isSubmiting} type="submit">
            {isSubmiting ? <LoadingSpinner /> : "Ingresar"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          No tienes una cuenta?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Registrate
          </Link>
        </p>
      </FormProvider>
    </>
  );
};

export default LoginForm;
