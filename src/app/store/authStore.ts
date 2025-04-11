'use client'
import { create } from "zustand"

interface AuthState {
  token: string | null
  idUsuario: number | null
  nomUsuario: string | null
  emaUsuario: string | null
  setUser: ({ idUsuario, nomUsuario, emaUsuario, token }: { idUsuario: number, nomUsuario: string, emaUsuario: string, token: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token') || null,
  idUsuario: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).idUsuario : null,
  nomUsuario:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).nomUsuario : null,
  emaUsuario:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).emaUsuario : null,
  setUser: ({ emaUsuario, idUsuario, nomUsuario, token }) => set(() => ({ emaUsuario, idUsuario, nomUsuario, token })),
  logout: () => set(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return ({
      token: null,
      idUsuario: null,
      nomUsuario: null,
      emaUsuario: null
    })
  })
}))