import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/core/providers/auth.provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/core/infrastructure/react-query/query-client";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: false,
});

export const metadata: Metadata = {
  title: "RanchApp",
  description: "Gestiona tus fincas y animales de manera eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Toaster position="bottom-center" />
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
