"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Loader2, Upload, X, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Category {
  _id: string
  name: string
  slug: string
}

interface ProjectType {
  _id: string
  name: string
  slug: string
  category: Category
  image?: string
  createdAt: string
  updatedAt: string
}

export default function ProjectTypesPage() {
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [newProjectTypeName, setNewProjectTypeName] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchingProjectTypes, setFetchingProjectTypes] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchProjectTypes(selectedCategory)
    } else {
      setProjectTypes([])
    }
  }, [selectedCategory])

  const resetForm = () => {
    setNewProjectTypeName("")
    setSelectedImage(null)
    setImagePreview(null)
    setEditingId(null)
    setOpenModal(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category")
      const data = await response.json()
      if (Array.isArray(data)) {
        setCategories(data)
      } else {
        toast({
          title: "Error",
          description: "Invalid response format from server",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      })
    }
  }

  const fetchProjectTypes = async (categoryId: string) => {
    setFetchingProjectTypes(true)
    try {
      const res = await fetch(`/api/project-types?categoryId=${categoryId}`)
      const data = await res.json()
      if (data.success) {
        setProjectTypes(data.data)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch project types",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch project types",
        variant: "destructive",
      })
    } finally {
      setFetchingProjectTypes(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      })
      return
    }

    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleAddProjectType = async () => {
    if (!newProjectTypeName.trim() || !selectedCategory) {
      toast({
        title: "Error",
        description: "Please enter project type name and select a category",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", newProjectTypeName)
      formData.append("categoryId", selectedCategory)
      if (selectedImage) formData.append("image", selectedImage)

      const response = await fetch("/api/project-types", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setProjectTypes([data.data, ...projectTypes])
        toast({
          title: "Success",
          description: "Project type added successfully",
        })
        resetForm()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to add project type",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to add project type",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProjectType = async () => {
    if (!editingId || !newProjectTypeName.trim() || !selectedCategory) {
      toast({
        title: "Error",
        description: "Please enter project type name and select a category",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", newProjectTypeName)
      formData.append("categoryId", selectedCategory)
      if (selectedImage) formData.append("image", selectedImage)

      const res = await fetch(`/api/project-types/${editingId}`, {
        method: "PATCH",
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        setProjectTypes((prev) => prev.map((pt) => (pt._id === editingId ? data.data : pt)))
        toast({
          title: "Success",
          description: "Project type updated successfully",
        })
        resetForm()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update project type",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to update project type",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (projectType: ProjectType) => {
    setEditingId(projectType._id)
    setNewProjectTypeName(projectType.name)
    setSelectedCategory(projectType.category._id)
    if (projectType.image) {
      setImagePreview(projectType.image)
    }
    setOpenModal(true)
  }

  const handleDeleteProjectType = async (id: string) => {
  if (!confirm("Are you sure you want to delete this project type?")) return;

  try {
    const response = await fetch(`/api/project-types/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      setProjectTypes((prev) => prev.filter((pt) => pt._id !== id));
      toast({
        title: "Success",
        description: "Project type deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: data.error || "Failed to delete project type",
        variant: "destructive",
      });
    }
  } catch {
    toast({
      title: "Error",
      description: "Failed to delete project type",
      variant: "destructive",
    });
  }
};


  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Types Management</h1>
          <div className="mb-6">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-muted-foreground">Manage project types for different categories.</p>
        </div>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpenModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project Type
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Project Type" : "Add Project Type"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Project type name"
                  value={newProjectTypeName}
                  onChange={(e) => setNewProjectTypeName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  {imagePreview && (
                    <Button type="button" variant="ghost" size="sm" onClick={removeImage}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {imagePreview && (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                {editingId && (
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={editingId ? handleUpdateProjectType : handleAddProjectType}
                  disabled={loading || !selectedCategory}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : editingId ? (
                    <Edit className="w-4 h-4 mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingId ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Types</CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedCategory ? (
            <p className="text-muted-foreground text-center py-8">Please select a category to view project types</p>
          ) : fetchingProjectTypes ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : projectTypes.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No project types found for selected category</p>
          ) : (
            <div className="space-y-3">
              {projectTypes.map((projectType) => (
                <div
                  key={projectType._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    {projectType.image && (
                      <div className="relative w-12 h-12 rounded-md overflow-hidden">
                        <Image
                          src={projectType.image || "/placeholder.svg"}
                          alt={projectType.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{projectType.name}</h3>
                      <p className="text-sm text-muted-foreground">Slug: {projectType.slug}</p>
                    </div>
                    <Badge variant="secondary">{projectType.category.name}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(projectType)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProjectType(projectType._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
