import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/theme.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AssistantButton from "./components/ai/AssistantButton";
import { AuthProvider } from "./providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katoki Institute for Ubuntu Leadership",
  description: "KIUL – Ubuntu Leadership, Research, Publishing, Counselling, and Short Courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[var(--kiul-bg-main)] text-[var(--kiul-text-dark)]`}
      >
        <AuthProvider>
          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CENTERED WRAPPER */}
          <main className="w-full flex justify-center pt-8 pb-20">
            <div className="max-w-[1200px] w-full px-6">
              {children}
            </div>
          </main>

          {/* FOOTER */}
          <Footer />

          <AssistantButton />
        </AuthProvider>
      </body>
    </html>
  );
}
