"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFInput from "@/components/rhf/RHFInput";
import RHFPasswordInput from "@/components/rhf/RHFPasswordInput";
import Link from "next/link";
import { useRegister } from "../../hooks/use-register-form";

const RegisterForm = () => {
  const { methods, onSubmit, isSubmiting } = useRegister();

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col w-full items-center gap-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="w-full md:max-w-sm">
            <RHFInput name="firstName" label="Nombre" />
            <RHFInput name="lastName" label="Apellido" />
            <RHFInput name="username" label="Nombre de usuario" />
            <RHFInput name="email" label="Email" />
            <RHFInput name="phone" label="Celular" />
            <RHFPasswordInput name="password" label="Contraseña" />
          </div>
          <Button disabled={isSubmiting} type="submit">
            {isSubmiting ? <LoadingSpinner /> : "Registrarse"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Ya tenés una cuenta?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
