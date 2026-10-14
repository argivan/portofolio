import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/components/client-provider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Argi Maulana | Fullstack Developer",
  description:
    "Portfolio of Argi Maulana, a Fullstack Developer building scalable web applications with Laravel, Node.js, Go, React, Next.js, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${bricolage.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
