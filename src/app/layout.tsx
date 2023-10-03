import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
// import Footer from "@/components/footer";
import Providers from "@/components/providers";

const poppins = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "BFTX Agency - AI Links",
  description: "Kumpulan Link AI ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={poppins.className}>{children}</body>
    // </html>
    <html lang="en">
      <body className={poppins.className}>
        <div className="star-bg"></div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
