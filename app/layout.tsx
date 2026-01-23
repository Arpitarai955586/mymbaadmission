
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "./Context/ModalContext";
import { BlogProvider } from "./Context/BlogContext";
import { ExamProvider } from "./Context/ExamContext";
import Modal from "./Components/Modal";
import { siteIdentity } from "./config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteIdentity.seo.title,
  description: siteIdentity.seo.description,
  icons: {
    icon: siteIdentity.logo,
    shortcut: siteIdentity.logo,
    apple: siteIdentity.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <BlogProvider>
            <ExamProvider>
              {children}
              <Modal />
            </ExamProvider>
          </BlogProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
