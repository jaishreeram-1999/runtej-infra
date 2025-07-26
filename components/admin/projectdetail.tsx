"use client"
import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Image from "next/image"
import {
  Plus,
  Edit,
  Trash2,
  Building,
  MapPin,
  Calendar,
  Layers,
  Upload,
  X,
  ImageIcon,
  Loader2,
  Search,
  Filter,
} from "lucide-react"

interface Project {
  _id: string
  name: string
  address: string
  mixedUseProjectType: string
  propertyType:
  | {
    _id: string
    name: string
  }
  | string
  floor: number
  sampleUnit: string
  basement: string
  totalBuiltUpArea: string
  yearOfCompletion: number
  description: string
  overview: string
  category: {
    _id: string
    name: string
  }
  imageUrl: string
}

interface Category {
  _id: string
  name: string
}

// Image Upload Component
function ImageUpload({
  value,
  onChange,
  onRemove,
}: {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        onChange(result.imageUrl)
        toast.success("Image uploaded successfully")
      } else {
        toast.error(result.error || "Failed to upload image")
      }
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  if (value) {
    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium">Project Image</Label>
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            <div className="relative group">
              <Image
                src={value || "/placeholder.svg"}
                alt="Project image"
                width={400}
                height={250}
                className="w-full h-64 object-contain"
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={openFileDialog} disabled={isUploading}>
                    <Upload className="w-4 h-4 mr-1" />
                    Change
                  </Button>
                  <Button type="button" size="sm" variant="destructive" onClick={onRemove} disabled={isUploading}>
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Project Image</Label>
      <Card
        className={`border-2 border-dashed transition-colors duration-200 ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
      >
        <CardContent className="p-0">
          <div
            className="relative h-64 flex flex-col items-center justify-center cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-600">Uploading image...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  )
}

// Input Field Component
function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  min,
  max,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  min?: string
  max?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full"
      />
    </div>
  )
}

// TextArea Field Component
function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none"
      />
    </div>
  )
}

// Main Component
export default function ProjectManagement() {
  const [form, setForm] = useState<Partial<Project>>({})
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all")
  const [projectTypes, setProjectTypes] = useState<Array<{ id: string; name: string; value: string }>>([])
  const [loadingProjectTypes, setLoadingProjectTypes] = useState(false)

  const fetchProjectTypes = async (categoryId: string) => {
    if (!categoryId) {
      setProjectTypes([])
      return
    }
    setLoadingProjectTypes(true)
    try {
      const res = await fetch(`/api/project-types?categoryId=${categoryId}`)
      const data = await res.json()
      if (data.success && data.data) {
        // Handle the object structure from your API
        const types = data.data.map((projectType: any) => ({
          id: projectType._id,
          name: projectType.name,
          value: projectType._id, // Use _id as the value for the select
        }))
        setProjectTypes(types)
      } else {
        console.error("API Error:", data.error)
        // Fallback to hardcoded types if API fails
        const fallbackTypes = getPropertyTypesByCategory(categoryId).map((type, index) => ({
          id: `fallback-${index}`,
          name: type,
          value: type,
        }))
        setProjectTypes(fallbackTypes)
      }
    } catch (error) {
      console.error("Fetch error:", error)
      // Fallback to hardcoded types if API fails
      const fallbackTypes = getPropertyTypesByCategory(categoryId).map((type, index) => ({
        id: `fallback-${index}`,
        name: type,
        value: type,
      }))
      setProjectTypes(fallbackTypes)
    } finally {
      setLoadingProjectTypes(false)
    }
  }

  // Fallback property types (in case API fails)
  const getPropertyTypesByCategory = (categoryId: string) => {
    const categoryPropertyTypes: Record<string, string[]> = {
      "1": ["Apartment Complex", "Villa Project", "Townhouse", "Condominium"],
      "2": ["Office Building", "Shopping Mall", "Warehouse", "Showroom"],
      "3": ["Mixed Use Tower", "Commercial + Residential", "Retail + Office"],
      "4": ["Manufacturing Unit", "Industrial Park", "Logistics Hub"],
      "5": ["Shopping Center", "Retail Plaza", "Market Complex"],
      "6": ["Corporate Office", "Business Park", "IT Complex"],
      "7": ["Hotel", "Resort", "Service Apartment"],
      "8": ["Hospital", "Clinic", "Medical Center"],
    }
    return categoryPropertyTypes[categoryId] || []
  }

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/project")
      const data = await res.json()
      setProjects(data)
      setFilteredProjects(data)
    } catch (error) {
      toast.error("Failed to fetch projects")
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      toast.error("Failed to fetch categories")
    }
  }

  useEffect(() => {
    fetchProjects()
    fetchCategories()
  }, [])

  // Fetch project types when selected category changes
  useEffect(() => {
    const selectedCategory = form.category
      ? typeof form.category === "string"
        ? form.category
        : form.category._id
      : ""
    if (selectedCategory) {
      fetchProjectTypes(selectedCategory)
    } else {
      setProjectTypes([])
    }
  }, [form.category])

  // Filter projects based on search and category
  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof project.propertyType === "object"
            ? project.propertyType.name.toLowerCase().includes(searchTerm.toLowerCase())
            : project.propertyType?.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategoryFilter && selectedCategoryFilter !== "all") {
      filtered = filtered.filter((project) => project.category._id === selectedCategoryFilter)
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedCategoryFilter])

  const handleChange = (name: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      // Reset property type when category changes
      if (name === "category") {
        updated.propertyType = ""
      }
      return updated
    })
  }

  const handleImageChange = (url: string) => {
    setForm((prev) => ({ ...prev, imageUrl: url }))
  }

  const handleImageRemove = () => {
    setForm((prev) => ({ ...prev, imageUrl: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = editingId ? `/api/project/${editingId}` : "/api/project"
      const method = editingId ? "PUT" : "POST"

      const finalFormData = {
        ...form,
        floor: Number(form.floor) || 0,
        yearOfCompletion: Number(form.yearOfCompletion) || new Date().getFullYear(),
      }

      // 🔍 Log data
      console.log("Form data before submit:", finalFormData)

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalFormData),
      })

      if (res.ok) {
        toast.success(`Project ${editingId ? "updated" : "added"} successfully`)
        resetForm()
        fetchProjects()
      } else {
        const error = await res.json()
        toast.error(error.error || "Error saving project")
      }
    } catch (error) {
      toast.error("Error saving project")
    } finally {
      setIsSubmitting(false)
    }
  }


  const handleEdit = (project: Project) => {
    // Handle propertyType properly when editing
    const formData = {
      ...project,
      propertyType: typeof project.propertyType === "object" ? project.propertyType._id : project.propertyType,
    }
    setForm(formData)
    setEditingId(project._id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const res = await fetch(`/api/project/${id}`, { method: "DELETE" })
        if (res.ok) {
          toast.success("Project deleted successfully")
          fetchProjects()
        } else {
          toast.error("Failed to delete project")
        }
      } catch (error) {
        toast.error("Failed to delete project")
      }
    }
  }

  const resetForm = () => {
    setForm({})
    setEditingId(null)
    setIsModalOpen(false)
    setProjectTypes([])
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const selectedCategory = form.category
    ? typeof form.category === "string"
      ? form.category
      : form.category._id || ""
    : ""

  const selectedPropertyType = typeof form.propertyType === "object" ? form.propertyType._id : form.propertyType || ""

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600 mt-1">Manage your property projects and details</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddModal} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Enhanced Image Upload */}
              <ImageUpload value={form.imageUrl} onChange={handleImageChange} onRemove={handleImageRemove} />

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Project Name"
                  name="name"
                  value={form.name || ""}
                  onChange={(value) => handleChange("name", value)}
                  required
                />
                <InputField
                  label="Address"
                  name="address"
                  value={form.address || ""}
                  onChange={(value) => handleChange("address", value)}
                  required
                />

                {/* Category Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={selectedCategory} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={`category-${cat._id}`} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type - depends on category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Property Type</Label>
                  <Select
                    value={selectedPropertyType}
                    onValueChange={(value) => handleChange("propertyType", value)}
                    disabled={!selectedCategory || loadingProjectTypes}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loadingProjectTypes
                            ? "Loading property types..."
                            : selectedCategory
                              ? "Select property type"
                              : "Select category first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={`property-type-${type.id}`} value={type.value}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <InputField
                  label="Number of Floors"
                  name="floor"
                  type="number"
                  value={form.floor?.toString() || ""}
                  onChange={(value) => handleChange("floor", value)}
                />
                <InputField
                  label="Sample Unit"
                  name="sampleUnit"
                  value={form.sampleUnit || ""}
                  onChange={(value) => handleChange("sampleUnit", value)}
                  placeholder="e.g., 1BHK, 2BHK, 3BHK"
                />
                <InputField
                  label="Basement Details"
                  name="basement"
                  value={form.basement || ""}
                  onChange={(value) => handleChange("basement", value)}
                  placeholder="e.g., 2 Level Parking"
                />
                <InputField
                  label="Total Built-Up Area"
                  name="totalBuiltUpArea"
                  value={form.totalBuiltUpArea || ""}
                  onChange={(value) => handleChange("totalBuiltUpArea", value)}
                  placeholder="e.g., 500,000 sq ft"
                />
                <InputField
                  label="Year of Completion"
                  name="yearOfCompletion"
                  type="number"
                  value={form.yearOfCompletion?.toString() || ""}
                  onChange={(value) => handleChange("yearOfCompletion", value)}
                  min="2000"
                  max="2050"
                />
              </div>

              {/* Description Fields */}
              <div className="space-y-6">
                <TextAreaField
                  label="Description"
                  name="description"
                  value={form.description || ""}
                  onChange={(value) => handleChange("description", value)}
                  rows={3}
                  placeholder="Brief description of the project..."
                />
                <TextAreaField
                  label="Overview"
                  name="overview"
                  value={form.overview || ""}
                  onChange={(value) => handleChange("overview", value)}
                  rows={4}
                  placeholder="Detailed overview of the project features and amenities..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? editingId
                      ? "Updating..."
                      : "Adding..."
                    : editingId
                      ? "Update Project"
                      : "Add Project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects by name, address, or property type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={`filter-${cat._id}`} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">All Projects</h2>
          <div className="text-sm text-gray-500">
            {filteredProjects.length} of {projects.length} {projects.length === 1 ? "project" : "projects"}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <Card className="p-12 text-center">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {projects.length === 0 ? "No projects yet" : "No projects match your search"}
            </h3>
            <p className="text-gray-500 mb-4">
              {projects.length === 0
                ? "Get started by adding your first property project."
                : "Try adjusting your search terms or filters."}
            </p>
            {projects.length === 0 && (
              <Button onClick={openAddModal}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <Card key={`project-${project._id}`} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="p-0">
                  {project.imageUrl ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-contain rounded-t-lg"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <Building className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{project.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="line-clamp-1">{project.address}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    {project.propertyType && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Type:</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {typeof project.propertyType === "object" ? project.propertyType.name : project.propertyType}
                        </span>
                      </div>
                    )}
                    {project.category && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Category:</span>
                        <span className="text-gray-600">{project.category.name}</span>
                      </div>
                    )}
                    {project.floor && (
                      <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3" />
                        <span>{project.floor} floors</span>
                      </div>
                    )}
                    {project.yearOfCompletion && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{project.yearOfCompletion}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(project)} className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(project._id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
