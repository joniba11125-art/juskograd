import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://juskograd-website.vercel.app"),
  title: "JUSKO GRAD | Gradbeništvo d.o.o.",
  description:
    "Nizka gradnja, izkopi, kanalizacija, vodovod, zunanja ureditev in gradbena dela na terenu.",
  openGraph: {
    title: "JUSKO GRAD | Gradbeništvo d.o.o.",
    description:
      "Nizka gradnja, izkopi, kanalizacija, vodovod, zunanja ureditev in gradbena dela na terenu.",
    url: "https://juskograd-website.vercel.app",
    siteName: "JUSKO GRAD",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JUSKO GRAD gradbena dela na terenu",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JUSKO GRAD | Gradbeništvo d.o.o.",
    description:
      "Nizka gradnja, izkopi, kanalizacija, vodovod, zunanja ureditev in gradbena dela na terenu.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl">
      <body>{children}</body>
    </html>
  );
}

