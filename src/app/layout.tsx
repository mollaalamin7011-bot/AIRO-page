import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vanguard Studio | Custom Websites, Mobile Apps & E-Commerce",
  description:
    "Next-generation digital agency engineering high-converting websites, iOS/Android mobile apps, and turnkey online stores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${jakarta.className} bg-[#070709] text-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}

