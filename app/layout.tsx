import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import ToasterProvider from "@/components/shared/ToasterProvider";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CozyHome",
  description:
    "Discover comfort and convenience at CozyCove Rentals. From charming cottages to luxurious villas, our properties cater to every traveler's needs. Immerse yourself in local culture and create unforgettable memories with us your perfect home away from home.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <SearchModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
