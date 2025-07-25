'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin-sidebar'
import { DashboardOverview } from '@/components/admin/dashboard-overview'
import { JobApplications } from '@/components/admin/job-applications'
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Counter from '@/components/admin/milestone'
import TestimonialsPage from '@/components/admin/testinomial'
import QuotationPage from '@/components/admin/quotation'
import GetContact from '@/components/admin/getcontact'
import ContactPostAdmin from '@/components/admin/postcontact'
import CategoryPage from '@/components/admin/category'
import ProjectDetail from '@/components/admin/projectdetail'
import ProjectTypesPage from '@/components/admin/project-types'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'admin') {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!session) return null

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />
      case 'counter':
        return <Counter />
      case 'applications':
        return <JobApplications />
      case 'quotations':
        return <div ><QuotationPage /></div>
      case 'testimonials':
        return <div><TestimonialsPage /></div>
      case 'propertycategory':
        return <div><CategoryPage /></div>
      case 'propertytype':
        return <div><ProjectTypesPage /></div>
      case 'propertydetail':
        return <div><ProjectDetail /></div>
      case 'getcontact':
        return <GetContact />
      case 'postcontact':
        return <div ><ContactPostAdmin /></div>
      default:
        return <DashboardOverview />
    }
  }

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      overview: 'Dashboard Overview',
      counter: 'Counter',
      applications: 'Job Applications',
      quotations: 'Get a Quotation',
      testimonials: 'Testimonials',
      propertycategory: 'Property Category',
      propertytype: 'Property Type',
      propertydetail: 'Property Detail',
      contact: 'Contact Management',
      'getcontact': 'postcontact',
    }
    return titles[activeSection] || 'Dashboard'
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">

        {/* Sidebar - responsive toggle */}
        <div className="hidden md:block w-54 shrink-0 border-r bg-white">
          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main Section */}
        <div className="flex flex-col flex-1 w-full">

          {/* Header */}
          <header className="flex items-center justify-between h-16 px-4 border-b bg-white">
            {/* Mobile sidebar trigger */}
            <SidebarTrigger className="md:hidden" />

            {/* Breadcrumb */}
            <div className="flex-1 hidden md:block ">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Admin Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{getSectionTitle()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* User info */}
            <div className="flex items-center space-x-4 text-sm">
              <span className="hidden sm:block text-muted-foreground">
                Welcome, {session.user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>
                Sign Out
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto  p-4 w-full">
            {/* Optional title for mobile */}
            <h2 className="text-xl font-semibold mb-2 md:hidden">{getSectionTitle()}</h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
