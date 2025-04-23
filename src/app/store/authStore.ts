'use client'
import { create } from "zustand"

interface AuthState {
  token: string | null
  idUsuario: number | null
  nomUsuario: string | null
  emaUsuario: string | null
  setUser: ({ idUsuario, nomUsuario, emaUsuario, token }: { idUsuario: number, nomUsuario: string, emaUsuario: string, token: string }) => void
  logout: () => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  idUsuario: null,
  nomUsuario:  null,
  emaUsuario:  null,
  setUser: ({ emaUsuario, idUsuario, nomUsuario, token }) => set(() => ({ emaUsuario, idUsuario, nomUsuario, token })),
  logout: () => set({
    token: null,
    idUsuario: null,
    nomUsuario: null,
    emaUsuario: null
  }),
  setToken: (token) => () => set({ token })
}))