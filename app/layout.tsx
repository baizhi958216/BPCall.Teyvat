import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

import "./globals.css";
import ActiveStatus from "./components/ActiveStatus";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Messager Clone",
  description: "Messager Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
