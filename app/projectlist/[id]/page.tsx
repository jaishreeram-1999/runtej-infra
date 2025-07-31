'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

// ✅ Define proper type instead of using `any`
interface Project {
  _id: string
  name: string
  address: string
}

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([])
  const params = useParams()

  // ✅ Get ID from URL
  const propertyTypeId = params.id as string
  console.log("Property Type ID from URL:", propertyTypeId)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/admin/projectdetails/${propertyTypeId}`)
        const data = await res.json()
        console.log("✅ Projects with ID from URL:", data)
        setProjects(data)
      } catch (error) {
        console.error("❌ Error:", error)
      }
    }

    if (propertyTypeId) fetchProjects()
  }, [propertyTypeId])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Project List Page</h1>
        <p className="text-gray-600 mb-4">Fetched by URL ID: {propertyTypeId}</p>

        <div className="text-left max-w-xl mx-auto">
          {projects.length === 0 ? (
            <p className="text-sm text-gray-500">No projects found.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="border p-3 rounded mb-3 shadow">
                <h2 className="font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-600">{project.address}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
