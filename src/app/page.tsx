import Header from "@/components/header/Header";
import { AuthProvider } from "@/contexts/AuthContext";
// import Image from "next/image";
// import 'tailwindcss/tailwind.css'

import { SessionProvider } from "next-auth/react"

export default function Home() {
  return (
      <Header/>
  );
}

// 'use client'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// const Main = () => {
//   const router = useRouter()

//   useEffect(() => {
//     router.push('/auth')
//   }, [])

//   return null
// }

// export default Main
