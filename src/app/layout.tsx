import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/ReduxProvider";
import SessionProvider from "@/components/SessionProvider";

// Poppins font from Google Fonts
const poppins = Poppins({
  weight: ["400", "700"], 
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins", 
});

export const metadata: Metadata = {
  title: "Todo Application",
  description: "Todo Application For Task Submission.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased text-gray-300`}>
        <SessionProvider session={null}>
          <ReduxProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#000000',
                  color: '#FFFFFF',
                },
              }}
            />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
