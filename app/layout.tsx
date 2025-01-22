import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Caveat, Jua, Playpen_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Provider from "@/components/Provider"


const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const playpen = Playpen_Sans({
  variable: "--font-playpen",
  subsets: ["latin"],
});

const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: ['400']
});

export const metadata: Metadata = {
  title: "Jane Doe | kindergarten teacher",
  description:"Jane Doe's profolio website - kindergarten teacher with over 7 years experience",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${caveat.variable} ${jua.variable} ${playpen.variable} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Provider session={undefined}>
          <ThemeProvider
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              {children}
          </ThemeProvider>
        </Provider>
        <Toaster/>
      </body>
    </html>
  );
}
