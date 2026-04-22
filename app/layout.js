import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  title: "Mascotas — Catàleg",
  description: "Catàleg de varietats de Mascotes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
