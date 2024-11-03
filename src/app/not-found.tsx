"use client";

import { Button } from "@/components/ui/button";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Card } from "@/components/ui/card";
import { IoIosReturnLeft } from "react-icons/io";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
      <Card className="p-10 flex flex-col items-center max-w-sm mx-auto text-center">
        <p className="p-3 text-sm font-medium  rounded-full bg-blue-50 dark:bg-green-800">
          <AiOutlineInfoCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
        </p>
        <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
          Página no encontrada
        </h1>
        <p className="mt-4 ">
          La página que busca no existe. Aquí tiene algunos enlaces:
        </p>

        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <Button variant="outline" onClick={() => router.back()}>
            <IoIosReturnLeft className="mr-2 h-4 w-4" />
            <span>Regresar</span>
          </Button>

          <Button onClick={() => router.push("/login")}>
            <span>Ir al inicio</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
