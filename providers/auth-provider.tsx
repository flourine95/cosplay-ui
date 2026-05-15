"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/stores/auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { refresh, setLoading } = useAuth()
  const router = useRouter()

  // Patch logout để redirect sau khi clear user
  useEffect(() => {
    useAuth.setState({
      logout: async () => {
        await fetch("/api/auth/logout", { method: "POST" })
        useAuth.setState({ user: null })
        router.push("/")
        router.refresh()
      },
    })
  }, [router])

  // Init: load session khi app mount
  useEffect(() => {
    refresh().finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
