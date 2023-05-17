import AuthContext from "@/app/UI/context/AuthContext";
import ToasterContext from "@/app/UI/context/ToasterContext";

import "./globals.css";
import ActiveStatus from "@/app/UI/components/ActiveStatus";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "提瓦特BB机",
  description: "旅行者，当你重新踏上旅途之后，一定要记得旅途本身的意义。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
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
