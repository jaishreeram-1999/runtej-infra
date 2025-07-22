"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Upload, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Image from "next/image"

interface PropertyType {
  id: string
  name: string
  slug: string
  description: string
  image: string
  totalProperties: number
}

const initialPropertyTypes: PropertyType[] = [
  {
    id: "1",
    name: "Apartments",
    slug: "apartments",
    description: "Modern residential apartments with premium amenities",
    image: "/placeholder.svg?height=200&width=300",
    totalProperties: 25,
  },
  {
    id: "2",
    name: "Villas",
    slug: "villas",
    description: "Luxury independent villas with private gardens",
    image: "/placeholder.svg?height=200&width=300",
    totalProperties: 12,
  },
  {
    id: "3",
    name: "Townhouses",
    slug: "townhouses",
    description: "Contemporary townhouses in gated communities",
    image: "/placeholder.svg?height=200&width=300",
    totalProperties: 8,
  },
]

export default function PropertyTypesPage() {
  const params = useParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>(initialPropertyTypes)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  })

  const categoryName =
    typeof params.category === "string"
      ? params.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Category"

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload to your server/cloud storage
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, image: imageUrl })
    }
  }

  const handleAddPropertyType = () => {
    const newPropertyType: PropertyType = {
      id: Date.now().toString(),
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      image: formData.image || "/placeholder.svg?height=200&width=300",
      totalProperties: 0,
    }
    setPropertyTypes([...propertyTypes, newPropertyType])
    setFormData({ name: "", slug: "", description: "", image: "" })
    setIsAddModalOpen(false)
  }

  const handleEditPropertyType = () => {
    if (!selectedPropertyType) return
    setPropertyTypes(
      propertyTypes.map((type) => (type.id === selectedPropertyType.id ? { ...type, ...formData } : type)),
    )
    setIsEditModalOpen(false)
    setSelectedPropertyType(null)
    setFormData({ name: "", slug: "", description: "", image: "" })
  }

  const handleDeletePropertyType = () => {
    if (!selectedPropertyType) return
    setPropertyTypes(propertyTypes.filter((type) => type.id !== selectedPropertyType.id))
    setIsDeleteModalOpen(false)
    setSelectedPropertyType(null)
  }

  const openEditModal = (propertyType: PropertyType) => {
    setSelectedPropertyType(propertyType)
    setFormData({
      name: propertyType.name,
      slug: propertyType.slug,
      description: propertyType.description,
      image: propertyType.image,
    })
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (propertyType: PropertyType) => {
    setSelectedPropertyType(propertyType)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{categoryName} Property Types</h1>
          <p className="text-muted-foreground">Manage property types for {categoryName.toLowerCase()}</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Property Type
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Property Type</DialogTitle>
              <DialogDescription>Create a new property type for {categoryName.toLowerCase()}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Property Type Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter property type name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="property-type-slug"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter property type description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Property Type Image</Label>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {formData.image && (
                    <div className="w-20 h-20 relative">
                      <Image
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPropertyType}>Add Property Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propertyTypes.map((propertyType) => (
          <Card key={propertyType.id} className="hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={propertyType.image || "/placeholder.svg"}
                alt={propertyType.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl">{propertyType.name}</CardTitle>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" onClick={() => openEditModal(propertyType)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openDeleteModal(propertyType)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{propertyType.description}</CardDescription>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{propertyType.totalProperties} properties</Badge>
              </div>
              <Link href={`/admin/categories/${params.category}/property-types/${propertyType.slug}/projects`}>
                <Button className="w-full bg-transparent" variant="outline">
                  View Projects
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Property Type</DialogTitle>
            <DialogDescription>Update the property type information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Property Type Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Property Type Image</Label>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                {formData.image && (
                  <div className="w-20 h-20 relative">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPropertyType}>Update Property Type</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property Type</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedPropertyType?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePropertyType}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
