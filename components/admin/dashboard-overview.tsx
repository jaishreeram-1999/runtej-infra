"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Briefcase, Star, Home, Calendar } from "lucide-react"

interface DashboardStats {
  totalApplications: number
  totalQuotesRequested: number
  totalTestimonials: number
  totalProjectsCompleted: number
  buildingsConstructed: number
  workersEmployed: number
  yearsOfExperience: number
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  if (!stats) {
    return <div className="flex items-center justify-center h-64">Failed to load stats</div>
  }

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: "Total Quotes Requested",
      value: stats.totalQuotesRequested,
      icon: Star,
      color: "text-green-600",
    },
    {
      title: "Total Testimonials",
      value: stats.totalTestimonials,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Total Projects Completed",
      value: stats.totalProjectsCompleted,
      icon: Building2,
      color: "text-purple-600",
    },
    {
      title: "Buildings Constructed",
      value: stats.buildingsConstructed,
      icon: Home,
      color: "text-red-600",
    },
    {
      title: "Workers Employed",
      value: stats.workersEmployed,
      icon: Users,
      color: "text-indigo-600",
    },
    {
      title: "Years of Experience",
      value: stats.yearsOfExperience,
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
