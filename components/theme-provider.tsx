"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, Attribute } from "next-themes"


interface ThemeProviderProps {
  children: React.ReactNode; // Ensure that children is part of the props
  defaultTheme: string;
  attribute?: Attribute | Attribute[] | undefined;  
  disableTransitionOnChange: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
  );
};
