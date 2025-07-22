"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Save, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface ProjectDetails {
  id: string
  name: string
  image: string
  address: string
  description: string
  overview: string
  sampleUnit: string
  floors: number
  basement: number
  totalBuiltUpArea: string
  yearCompleted: string
  status: "Active" | "Completed" | "Under Construction"
}

const initialProjectData: ProjectDetails = {
  id: "1",
  name: "Skyline Residences",
  image: "/placeholder.svg?height=400&width=600",
  address: "123 Downtown Avenue, City Center, Metropolitan City - 400001",
  description:
    "Skyline Residences is a premium residential project offering luxury living in the heart of the city. With state-of-the-art amenities and modern architecture, it provides an unparalleled living experience.",
  overview:
    "This mixed-use development combines residential, commercial, and recreational spaces to create a vibrant community. The project features sustainable design elements, smart home technology, and world-class amenities including a fitness center, swimming pool, and landscaped gardens.",
  sampleUnit: "4BHK",
  floors: 6,
  basement: 2,
  totalBuiltUpArea: "45,000 sqft",
  yearCompleted: "2024",
  status: "Active",
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [projectData, setProjectData] = useState<ProjectDetails>(initialProjectData)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<ProjectDetails>(initialProjectData)

  const categoryName =
    typeof params.category === "string"
      ? params.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Category"

  const propertyTypeName =
    typeof params.propertyType === "string"
      ? params.propertyType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Property Type"

  const projectName =
    typeof params.project === "string"
      ? params.project.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Project"

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setEditData({ ...editData, image: imageUrl })
    }
  }

  const handleSave = () => {
    setProjectData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(projectData)
    setIsEditing(false)
  }

  const getStatusColor = (status: ProjectDetails["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Under Construction":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{projectName}</h1>
          <p className="text-muted-foreground">
            {propertyTypeName} in {categoryName}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Project
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Image */}
          <Card>
            <CardHeader>
              <CardTitle>Project Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 w-full mb-4">
                <Image
                  src={isEditing ? editData.image : projectData.image}
                  alt={projectData.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {isEditing && (
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  <p className="text-lg font-semibold">{projectData.name}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  />
                ) : (
                  <p>{projectData.address}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <select
                    id="status"
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value as ProjectDetails["status"] })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <Badge className={getStatusColor(projectData.status)}>{projectData.status}</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows={4}
                />
              ) : (
                <p>{projectData.description}</p>
              )}
            </CardContent>
          </Card>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editData.overview}
                  onChange={(e) => setEditData({ ...editData, overview: e.target.value })}
                  rows={6}
                />
              ) : (
                <p>{projectData.overview}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Project Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Sample Unit</Label>
                {isEditing ? (
                  <Input
                    value={editData.sampleUnit}
                    onChange={(e) => setEditData({ ...editData, sampleUnit: e.target.value })}
                  />
                ) : (
                  <p className="font-semibold">{projectData.sampleUnit}</p>
                )}
              </div>

              <Separator />

              <div>
                <Label>Floors</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editData.floors}
                    onChange={(e) => setEditData({ ...editData, floors: Number.parseInt(e.target.value) || 0 })}
                  />
                ) : (
                  <p className="font-semibold">{projectData.floors}</p>
                )}
              </div>

              <Separator />

              <div>
                <Label>Basement</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editData.basement}
                    onChange={(e) => setEditData({ ...editData, basement: Number.parseInt(e.target.value) || 0 })}
                  />
                ) : (
                  <p className="font-semibold">{projectData.basement}</p>
                )}
              </div>

              <Separator />

              <div>
                <Label>Total Built-up Area</Label>
                {isEditing ? (
                  <Input
                    value={editData.totalBuiltUpArea}
                    onChange={(e) => setEditData({ ...editData, totalBuiltUpArea: e.target.value })}
                  />
                ) : (
                  <p className="font-semibold">{projectData.totalBuiltUpArea}</p>
                )}
              </div>

              <Separator />

              <div>
                <Label>Year Completed</Label>
                {isEditing ? (
                  <Input
                    value={editData.yearCompleted}
                    onChange={(e) => setEditData({ ...editData, yearCompleted: e.target.value })}
                  />
                ) : (
                  <p className="font-semibold">{projectData.yearCompleted}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                View Gallery
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Download Brochure
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Contact Information
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
