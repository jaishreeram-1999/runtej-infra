"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Plus, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Service {
  id: string
  title: string
  category: string
  description: string
  image: string
  subcategories: string[]
  isActive: boolean
  createdAt: Date
}

const serviceCategories = ["Housing & Residential", "Public Spaces", "Transportation", "Commercial", "Industrial"]

export function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    subcategories: "",
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error("Failed to fetch services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subcategories: formData.subcategories.split(",").map((s) => s.trim()),
          isActive: true,
        }),
      })

      if (response.ok) {
        const newService = await response.json()
        setServices([...services, newService])
        setFormData({ title: "", category: "", description: "", image: "", subcategories: "" })
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to create service:", error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real application, you would upload to a cloud service
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, image: imageUrl })
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading services...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Services Management</h2>
          <p className="text-muted-foreground">Manage your infrastructure services</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="subcategories">Subcategories (comma-separated)</Label>
                <Input
                  id="subcategories"
                  value={formData.subcategories}
                  onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                  placeholder="e.g., 2BHK, 3BHK, 4BHK"
                />
              </div>

              <div>
                <Label htmlFor="image">Service Image</Label>
                <div className="flex items-center space-x-2">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                  <Upload className="h-4 w-4" />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Service</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {service.category}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex flex-wrap gap-1">
                {service.subcategories.map((sub, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {sub}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
