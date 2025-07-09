"use client"

import * as React from "react"
import {
  BarChart3,
  Building2,
  FileText,
  MessageSquare,
  Quote,
  Settings,
  Home,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminSidebar({ activeSection, onSectionChange, ...props }: AdminSidebarProps) {
  const [openDropdown, setOpenDropdown] = React.useState({
    quotations: false,
    management: false,
  })

  const toggleDropdown = (key: keyof typeof openDropdown) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const buttonBaseClass =
    "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition-all"
  const itemBaseClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all"

  const getButtonStyle = (id: string) =>
    activeSection === id
      ? "bg-black text-white font-semibold"
      : "bg-white text-black hover:bg-black hover:text-white"

  return (
    <Sidebar {...props} className="h-screen">
      <SidebarContent className="bg-green-400 text-white w-64">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold px-4 py-8 border-b border-[#000000] mb-4 text-white">
            Admin Dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Overview */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "overview"}
                  onClick={() => onSectionChange("overview")}
                  className={`${itemBaseClass} ${getButtonStyle("overview")}`}
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Applications */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "applications"}
                  onClick={() => onSectionChange("applications")}
                  className={`${itemBaseClass} ${getButtonStyle("applications")}`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Job Applications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Dropdown: Quotations */}
              <SidebarMenuItem>
                <button
                  onClick={() => toggleDropdown("quotations")}
                  className={`${buttonBaseClass} ${openDropdown.quotations ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"}`}
                >
                  <span className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5" />
                    <span>Quotations</span>
                  </span>
                  {openDropdown.quotations ? <ChevronDown /> : <ChevronRight />}
                </button>

                {openDropdown.quotations && (
                  <div className="mt-1 space-y-1 ml-4">
                    <button
                      onClick={() => onSectionChange("quotes")}
                      className={`${itemBaseClass} ${getButtonStyle("quotes")}`}
                    >
                      Quote Requests
                    </button>
                    <button
                      onClick={() => onSectionChange("quotations")}
                      className={`${itemBaseClass} ${getButtonStyle("quotations")}`}
                    >
                      Get a Quotation
                    </button>
                  </div>
                )}
              </SidebarMenuItem>

              {/* Testimonials */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "testimonials"}
                  onClick={() => onSectionChange("testimonials")}
                  className={`${itemBaseClass} ${getButtonStyle("testimonials")}`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Testimonials</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Dropdown: Management */}
              <SidebarMenuItem>
                <button
                  onClick={() => toggleDropdown("management")}
                  className={`${buttonBaseClass} ${openDropdown.management ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"}`}
                >
                  <span className="flex items-center gap-3">
                    <Settings className="w-5 h-5" />
                    <span>Management</span>
                  </span>
                  {openDropdown.management ? <ChevronDown /> : <ChevronRight />}
                </button>

                {openDropdown.management && (
                  <div className="mt-1 space-y-1 ml-4">
                    <button
                      onClick={() => onSectionChange("services")}
                      className={`${itemBaseClass} ${getButtonStyle("services")}`}
                    >
                      Services Management
                    </button>
                    <button
                      onClick={() => onSectionChange("admin-actions")}
                      className={`${itemBaseClass} ${getButtonStyle("admin-actions")}`}
                    >
                      Admin Actions
                    </button>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
