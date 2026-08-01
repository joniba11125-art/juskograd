import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerija | JUSKO GRAD",
  description: "Fotografije radova i projekata firme JUSKO GRAD.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
