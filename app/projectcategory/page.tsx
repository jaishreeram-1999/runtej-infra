"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "Beautifully Industrial Home",
    price: "$4,560,000",
    beds: 4,
    baths: 2,
    area: 1200,
    image: "/projectdetails/industrial/industrial (1).jpg",
  },
  {
    id: 2,
    title: "Historic Villa Restored",
    price: "$8,760,000",
    beds: 4,
    baths: 2,
    area: 1200,
    image: "/projectdetails/industrial/industrial (2).jpg",
  },
  {
    id: 3,
    title: "Vintage Mansion",
    price: "$5,900,000",
    beds: 5,
    baths: 3,
    area: 1500,
    image: "/projectdetails/industrial/industrial (3).jpg",
  },
  {
    id: 4,
    title: "Michael Mansion",
    price: "$5,900,000",
    beds: 5,
    baths: 3,
    area: 1500,
    image: "/projectdetails/industrial/industrial (4).jpg",
  },
  {
    id: 5,
    title: "Franklin Mansion",
    price: "$5,900,000",
    beds: 5,
    baths: 3,
    area: 1500,
    image: "/projectdetails/industrial/industrial (5).jpg",
  },
  {
    id: 5,
    title: "Kasib Mansion",
    price: "$5,900,000",
    beds: 5,
    baths: 3,
    area: 1500,
    image: "/projectdetails/industrial/pg8.jpg",
  },
  {
    id: 5,
    title: "Michael Industry",
    price: "$5,900,000",
    beds: 5,
    baths: 3,
    area: 1500,
    image: "/projectdetails/industrial/pg10.jpg",
  },
  {
    id: 5,
    title: "Henry Mansion",
    price: "$5,900,000",
    beds: 5,
    baths: 3,
    area: 1500,
    image: "/projectdetails/industrial/pg9.jpg",
  },
];

function ProjectCategory() {
  return (
    <>
      {/* Full-width Header */}
      <div className=" w-full mt-20 bg-[#bceb9757] py-8 px-4 sm:px-6 md:px-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold">Our services – Industrial Construction & Development </h2>
          <p className="text-sm text-gray-500 mb-1 py-2">Home / Industrial</p>
          <p className="text-sm text-gray-600 mt-1 mb-2">
            Discover a wide range of industrial Construction and Development services perfect for factories, warehouses, logistics hubs, and other large-scale operations. Our Services offer well-connected Plans, strong infrastructure, and flexible space options to support your business growth and productivity. .
          </p>
        </div>
      </div>

      {/* Property Listings */}
      <main className="container mx-auto mt-12 min-h-screen px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/projectdetails`} // adjust path as needed
              className="bg-white rounded shadow overflow-hidden block"
            >
              <div className="relative w-full h-64 sm:h-56">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 right-2  text-white text-xs px-2 py-1 rounded">
                  FOR SALE
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-teal-700 font-bold">{property.price}</p>
                <div className="text-sm text-gray-500 flex flex-wrap gap-4 mt-2">
                  {/* Add property details here if needed */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </>
  );
}

export default ProjectCategory;
