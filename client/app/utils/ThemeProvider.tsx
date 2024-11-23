"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({children, ...Props} : ThemeProviderProps) {
  return (
    <NextThemesProvider defaultTheme="light" {...Props}>
      {children}
    </NextThemesProvider>
  )
}