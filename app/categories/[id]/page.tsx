"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import axios from "axios"

interface Category {
  _id: string
  name: string
  description?: string
  icon?: string
  parentCategory: string | null
  createdAt: string
  updatedAt: string
}

function CategoriesPage() {
  const { id } = useParams() as { id: string }
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)

        // ✅ API call based on parentCategory = id
        const res = await axios.get(`/api/admin/categories?parentCategory=${id}`)
        // console.log("Fetched Categories:", res.data)
    
        setCategories(res.data.categories || [])
      } catch (error) {
        console.error("Failed to fetch categories", error)
        setError("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchCategories()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Subcategories</h2>
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px] justify-items-center">
          {categories.map((category, index) => {
            const colSpan =
              index % 6 === 0 || index % 6 === 5 ? "md:col-span-2" : "md:col-span-1"
            const linkHref = `/projectlist/${category._id}`

            return (
              <Link key={category._id} href={linkHref} className={`block w-full ${colSpan} group`}>
                <div className="relative h-[300px] rounded-md overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={
                      category.icon ||
                      `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(category.name)}`
                    }
                    alt={category.name}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-end p-5 text-white">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{category.name}</h3>
                    {category.description && (
                      <p className="text-xs sm:text-sm opacity-90 mb-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm">View Subcategories →</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CategoriesPage
