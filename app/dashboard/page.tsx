"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session || session.user?.role !== "admin") {
      router.push("/login")
    }
  }, [session, status, router])

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => signOut({ callbackUrl: "/login" })}>Sign Out</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome, {session.user?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Email: {session.user?.email}</p>
            <p>Role: {session.user?.role}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
