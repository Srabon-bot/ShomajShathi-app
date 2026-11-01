import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { demoUser } from "@/lib/mock-data";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * One family, two cuts. Archivo Black carries every display heading and the
 * wordmark; Archivo carries everything else. There is no second voice.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${site.name} — Community work, organised`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${archivoBlack.variable}`}
    >
      <body className="min-h-svh">
        <Providers>
          <Navbar user={demoUser} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
