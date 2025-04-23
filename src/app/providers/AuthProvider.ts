'use client'
import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const {setUser, idUsuario} = useAuthStore(store => store)

  useEffect(() => {
    const storedUsuario = localStorage.getItem('user') as string | null
    if (!storedUsuario) return
    setUser(JSON.parse(storedUsuario) as { idUsuario: number, nomUsuario: string, emaUsuario: string, token: string })
  }, [])

  useEffect(() => {
    if (!idUsuario) {
      localStorage.removeItem('user')
    }
  }, [idUsuario])

  return children
}