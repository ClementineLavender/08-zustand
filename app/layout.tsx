import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Simple and efficient application for managing personal notes",
  openGraph: {
    title: "NoteHub",
    description: "Simple and efficient application for managing personal notes",
    url: "https://notehub.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-09-meta.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            {modal}
            <div id="modal-root" />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}