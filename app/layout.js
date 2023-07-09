"use client"
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.css';
import { SessionProvider } from "next-auth/react"
import styles from "../styles/globals.css"

export const metadata = {
  title: 'QuizWiz',
  description: 'Online test application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <SessionProvider>
      <body>
      {children}
      </body>
    </SessionProvider>

    </html>
  )
}
