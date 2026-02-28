import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google"; // Using Google Fonts via next/font
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Bharat Mirror - India's Premier Digital News Platform",
    template: "%s | The Bharat Mirror",
  },
  description: "Breaking news, analysis, and opinion from India and the world.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://admin.thebharatmirror.com" />
      </head>
      <body className={cn(
        "min-h-screen bg-white dark:bg-[#050505] font-sans antialiased transition-colors duration-300",
        playfair.variable,
        lato.variable
      )}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            {/* V6 DEPLOYMENT TAG */}
            <script dangerouslySetInnerHTML={{ __html: `console.log('TBM V6 DEPLOYED')` }} />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
