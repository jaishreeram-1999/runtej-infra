'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  _id: string
  name: string
  address: string
  imageUrl: string
  yearOfCompletion: number
  totalBuiltUpArea: string
  propertyType: string
}

export default function ProjectsByPropertyTypePage() {
  const { id } = useParams() // this is propertyType id
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/admin/projectdetails?propertyType=${id}`)
      const data = await res.json()

      const filtered = data.filter((p: any) => p.propertyType?.toString() === id)

      setProjects(filtered)
      console.log("✅ Filtered projects:", filtered)
    } catch (err) {
      console.error("❌ Error fetching projects:", err)
    } finally {
      setLoading(false)
    }
  }

  if (id) fetchProjects()
}, [id])



  if (loading) return <p className="p-10 text-center">Loading...</p>
  if (!projects.length) return <p className="p-10 text-center">No projects found.</p>

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Projects for Property Type ID: {id}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/projectdetail/${project._id}`} key={project._id}>
          <div key={project._id} className="bg-white rounded shadow p-4">
            <div className="relative w-full h-60 mb-3">
              <Image
                src={project.imageUrl}
                alt={project.name || "Project image"}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-600">Address: {project.address}</p>
            <p className="text-sm text-gray-600">Built-up Area: {project.totalBuiltUpArea}</p>
            <p className="text-sm text-gray-600">Year Completed: {project.yearOfCompletion}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
