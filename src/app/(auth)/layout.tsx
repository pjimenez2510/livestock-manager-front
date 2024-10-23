import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  p-8">
      <Card className="w-full md:max-w-md">
        <CardHeader className="flex items-center justify-between">
          <Image
            priority
            src="/images/logo-app.jpg"
            alt="RanchApp"
            width={170}
            height={170}
            className="rounded-full shadow-lg"
          />
          <CardTitle className="text-2xl">RanchApp</CardTitle>
          <CardDescription>La aplicación para los ganaderos</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
