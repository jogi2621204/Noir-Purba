import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Noir Primadona Purba, PhD — Associate Professor of Physical Oceanography",
  description:
    "Associate Professor at Universitas Padjadjaran. Physical oceanographer, ocean technology innovator, and marine debris researcher. Citations: 2,597 · h-index: 29 · i10-index: 71.",
  keywords: [
    "Noir Purba",
    "Physical Oceanography",
    "Marine Science",
    "Universitas Padjadjaran",
    "RHEA ARHEA",
    "ClimBoX",
    "Marine Debris Indonesia",
    "Ocean Monitoring",
  ],
  authors: [{ name: "Noir Primadona Purba" }],
  openGraph: {
    title:
      "Noir Primadona Purba — Associate Professor of Physical Oceanography",
    description:
      "Physical oceanographer, ocean technology innovator, and marine debris researcher at Universitas Padjadjaran.",
    type: "website",
    images: [
      {
        url: "/images/noir-purba.jpg",
        width: 800,
        height: 800,
        alt: "Noir Primadona Purba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noir Primadona Purba, PhD",
    description:
      "Associate Professor of Physical Oceanography · Universitas Padjadjaran",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
