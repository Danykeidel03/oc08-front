import { DM_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const title = "Orgullo Cazurro — Hazte socio";
const description =
  "Orgullo Cazurro, la afición de la Cultural y Deportiva Leonesa. Hazte socio de la Cultural Leonesa y suma tu voz a la grada.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Orgullo Cazurro",
    images: [
      {
        url: "/images/stadium.jpeg",
        width: 2048,
        height: 1152,
        alt: "Grada del estadio en un día de partido",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/stadium.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
