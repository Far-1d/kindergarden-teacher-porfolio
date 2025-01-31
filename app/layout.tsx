import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Caveat, Jua, Playpen_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Provider from "@/components/Provider"


const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const playpen = Playpen_Sans({
  variable: "--font-playpen",
  subsets: ["latin"],
  display: "swap",
});

const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: ['400'],
  display: "swap",
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
              <div className="w-full h-full flex items-center justify-center z-0 bg-cover bg-no-repeat
              font-[family-name:var(--font-vazir)] bg-[url('/bg-white-xs.webp')] dark:bg-[url('/bg.svg')]
              text-black dark:text-white">
                {children}
              </div>
          </ThemeProvider>
        </Provider>
        <Toaster/>
      </body>
    </html>
  );
}
