"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Plus, Edit2, Trash2, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const fetchCategories = async () => {
    const res = await fetch("/api/category")
    const data = await res.json()
    setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const slug = generateSlug(name)
    const url = editingId ? `/api/category/${editingId}` : "/api/category"
    const method = editingId ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      })

      if (!res.ok) throw new Error("Submission failed")

      toast.success(`Category ${editingId ? "updated" : "added"} successfully`, {
        description: `"${name}" has been ${editingId ? "updated" : "created"}.`,
      })

      setName("")
      setEditingId(null)
      setShowModal(false)
      fetchCategories()
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again.",
      })
    }
  }

  const handleEdit = (cat: any) => {
    setName(cat.name)
    setEditingId(cat._id)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this category?")) {
      await fetch(`/api/category/${id}`, { method: "DELETE" })
      fetchCategories()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Tag className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
          </div>
          <p className="text-muted-foreground">Create and manage your content categories</p>
        </div>

        {/* Top row with Add Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Categories ({categories.length})</h2>
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingId(null)
                setName("")
                setShowModal(true)
              }}>
                <Plus className="h-4 w-4 mr-1" />
                Add Category
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Category" : "Add Category"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Category Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name..."
                    className="h-11"
                    required
                  />
                  {name && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Slug preview:</span>
                      <Badge variant="secondary" className="font-mono">
                        {generateSlug(name)}
                      </Badge>
                    </div>
                  )}
                </div>

                <DialogFooter className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setName("")
                      setEditingId(null)
                      setShowModal(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingId ? "Update" : "Add"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {/* Categories List */}
        {categories.length === 0 ? (
          <Card className="border-dashed border-2 bg-white/50">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Tag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No categories yet</h3>
              <p className="text-sm text-muted-foreground">Create your first category to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {categories.map((cat) => (
              <Card
                key={cat._id}
                className="group hover:shadow-md transition-all duration-200 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{cat.name}</h3>
                        <Badge variant="outline" className="font-mono text-xs">
                          {cat.slug}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(cat)}
                        className="flex items-center gap-1.5"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(cat._id)}
                        className="flex items-center gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
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
