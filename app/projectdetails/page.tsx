'use client'
import { FaMapMarkerAlt, FaHeart, FaShareAlt, FaPrint } from 'react-icons/fa';
import { FaCar, FaBed, FaShower, FaRulerCombined, FaCalendarAlt } from 'react-icons/fa';
import React from "react";
import { useState } from 'react';
import Image from 'next/image';


function ProjectDetail() {

  const [activeTab, setActiveTab] = useState("about");

  const tabs = ["about", "features", "location", "plans",];

  const tabClass = (tab) =>
    `capitalize pb-2 transition-all ${activeTab === tab
      ? "text-black-700 border-b-2 border-green-700"
      : "text-gray-500"
    }`;


  return (
    <div>
      <div
        className="relative h-[80vh] bg-cover bg-center px-4 md:px-16"
        style={{ backgroundImage: "url('/projectdetails/projectdetail.jpg')" }}
      >
        <div className="absolute top-5 left-5 bg-black text-white text-xs px-3 py-1 rounded">PROJECT SHOWCASE</div>

        <div className="absolute top-20 left-4 md:left-16 text-white text-sm flex gap-2 items-center">
          <span>Home</span> / <span>Projects</span> / <span className="font-semibold">Modern Construction</span>
        </div>

        <div className="absolute bottom-10 left-4 md:left-16 text-white max-w-[90%]">
          <h1 className="text-3xl font-bold">Modern Construction</h1>
          <p className="flex items-center gap-2 mt-2 text-sm md:text-base">
            <FaMapMarkerAlt />
            4936 N Broadway St, Chicago, IL 60640, USA
          </p>
        </div>

        <div className="absolute bottom-10 right-4 md:right-16 text-white text-right space-y-2">
          

          {/* Icons */}
          <div className="flex justify-end gap-4 text-base">
            <FaHeart className="cursor-pointer" />
            <FaShareAlt className="cursor-pointer" />
            <FaPrint className="cursor-pointer" />
          </div>
          {/* Project Cost */}
          <p className="text-sm md:text-base font-semibold">
            Project Cost: $2.5 Million
          </p>
        </div>



      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-16 mt-10 mb-20">
        {/* LEFT: Overview + Description */}
        <div className="w-full lg:w-2/3 space-y-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4"> Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold">Mixed-Use Project</p>
                <p className="text-sm text-gray-500">Project Type</p>
              </div>
              <div>
                <p className="font-semibold">4 BHK</p>
                <p className="text-sm text-gray-500">Sample Unit</p>
              </div>
              <div>
                <p className="font-semibold">6</p>
                <p className="text-sm text-gray-500">Floors</p>
              </div>
              <div>
                <p className="font-semibold">2</p>
                <p className="text-sm text-gray-500">Basements</p>
              </div>
              <div>
                <p className="font-semibold">45,000 Sq Ft</p>
                <p className="text-sm text-gray-500">Total Built-up Area</p>
              </div>
              <div>
                <p className="font-semibold">2024</p>
                <p className="text-sm text-gray-500">Year Completed</p>
              </div>

            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Project Description</h2>
            <p className="text-gray-600">
              This project showcases our commitment to quality, design, and precision. Built using top-grade materials and advanced engineering techniques, the structure delivers strength, style, and long-term value.
              <br /><br />
              Every aspect — from foundation to finish — is crafted with attention to detail, safety, and usability. Whether it’s for residential, institutional, or commercial use, this space reflects our mission to build infrastructure that supports the future.
              <br /><br />
              With modern design, functional layouts, and a strong structural base, this project is a perfect example of durable construction and smart planning.
            </p>
          </div>
        </div>

        {/* RIGHT: Image or Map Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-4 rounded shadow h-full flex flex-col justify-center">
            <div className="relative w-full aspect-square">
              <Image
                src="/projectdetails/aboutdescription.jpg"
                alt="Project Showcase"
                fill
                className="rounded object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>


      <div className="flex gap-8 justify-center text-md font-medium px-4 md:px-16 py-4 sticky top-0 bg-white z-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${tabClass(tab)} text-center`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 md:px-16 mt-10 mb-20">

        {activeTab === "about" && (
          <div className="w-full bg-white py-10">
            <div className="container mx-auto px-4 md:px-8">
              <div className="py-10">


                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Where Elegance Meets Innovation</h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Discover a space crafted with vision and detail — where architectural beauty, modern amenities, and thoughtful design come together. This address is more than just a location; it&apos;s a reflection of style, comfort, and a forward-thinking lifestyle that elevates everyday living to something extraordinary.
                </p>
              </div>

              {/* Top Image Section */}
              <div className="relative w-full aspect-video rounded overflow-hidden shadow mb-10">
                <Image
                  src="/projectdetails/aboutdetail.jpg"
                  alt="About Section"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Image + Text Grid 1 */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10  mx-auto">
                  {/* Right Text */}
                  <div className="w-full md:w-1/2 text-center md:text-left px-2 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                      Designed to Inspire
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-base leading-relaxed">
                      Step into a space where elegance meets function. This beautifully crafted lobby welcomes guests with style, making a strong first impression. Surrounded by premium shops, modern cafes, and top-tier residences, it sets a new standard for city living and business presence.
                    </p>
                  </div>

                  {/* Left Image */}
                  <div className="relative w-full md:w-1/2 h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/projectdetails/exterior-aboutdetail.jpg"
                      alt="Entrance"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Image + Text Grid 2 */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10  mx-auto mt-10">
                  {/* Left Image */}
                  <div className="relative w-full md:w-1/2 h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/projectdetails/aboutdetails2.jpg"
                      alt="Entrance"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Right Text */}
                  <div className="w-full md:w-1/2 text-center md:text-left px-2 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                      Where Comfort Meets Style
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-base leading-relaxed">
                      Experience a welcoming atmosphere designed for both relaxation and productivity. This modern lobby blends warm tones with sleek design, creating the perfect balance for residents and visitors alike. Enjoy easy access to vibrant shops, cozy cafes, and elegant living spaces all around.
                    </p>
                  </div>
                </div>
              </div>



              <div className="w-full bg-[#FFFBEC] mt-4 py-16 px-4 md:px-12">
                <div className="container mx-auto">

                  {/* Heading & Description */}
                  <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                      Smart Spaces Built for Success
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg ">
                      Our office spaces are designed to grow with your business. These open, customizable units give you the freedom to create your ideal workspace — whether it&apos;s for meetings, daily operations, or client interactions. With flexible layouts and smart design, your office will match your ambitions.
                    </p>
                    <p className="mt-4 text-green-600 font-semibold uppercase text-sm">
                      Possession: Under Construction
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
                    {[
                      { icon: "🛠️", text: "Fully customizable units with reception, meeting room, pantry, and more" },
                      { icon: "🧭", text: "Vastu-compliant design" },
                      { icon: "🌞", text: "Generous floor-to-floor height for natural light" },
                      { icon: "📐", text: "Column-free floor layout for flexible planning" },
                      { icon: "❄️", text: "Elegantly designed and air-conditioned floor lobbies" },
                      { icon: "🚚", text: "Separate loading and unloading bay" },
                      { icon: "🔐", text: "Multilevel security with access control" },
                    ].map((feature, idx) => (
                      <div key={idx} className="bg-white p-4 rounded shadow flex items-start gap-3">
                        <span className="text-yellow-700 text-2xl">{feature.icon}</span>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>


            </div>
          </div>
        )}


        {activeTab === "features" && (
          <div className="bg-white p-6 rounded shadow">
            {/* Top Image Section */}
            <div className="relative w-full aspect-video rounded overflow-hidden shadow mb-10">
              <Image
                src="/projectdetails/featuredetail.jpg"
                alt="About Section"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl font-semibold mb-4">Where Elegance Meets Innovation</h2>
            <p className="text-gray-600 mb-6">
              Discover a space crafted with vision and detail — where architectural beauty, modern amenities,
              and thoughtful design come together. This address is more than just a location; it's a reflection
              of style, comfort, and a forward-thinking lifestyle that elevates everyday living to something
              extraordinary.
            </p>

            <h2 className="text-xl font-semibold mb-4">Premium Office Amenities Designed for Efficiency</h2>
            <ul className="text-gray-600 list-disc list-inside space-y-2">
              <li>Amenities with modern design, high-quality materials, and long-lasting build quality</li>
              <li>Fully customizable units with provisions for a reception area, private cabins, meeting rooms, workspaces, washroom, and pantry</li>
              <li>Vastu-compliant layouts promoting harmony and well-being</li>
              <li>Impressive floor-to-floor height for abundant natural light and a spacious feel</li>
            </ul>
          </div>
        )}



        {activeTab === "location" && (
          <div className="px-4 md:px-8 space-y-10">
            {/* Custom Project Location Description */}
            <div className="bg-white p-6 rounded shadow flex flex-col gap-10">
              <div className="w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Built Where It Matters Most
                </h2>
                <p className="text-gray-600">
                  Every project we undertake at Runtej Infra is tailored to our client’s unique location and purpose — from educational campuses in city suburbs to industrial warehouses in rural zones. Our focus is not on where we build, but how we deliver lasting quality and infrastructure suited to each site&apos;s demands.
                </p>
              </div>

              {/* Project Highlights */}
              <div className="w-full bg-white p-6 rounded-lg space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1 */}
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-1">📍 Client-Selected Sites</h3>
                    <p className="text-gray-700">Construction carried out in multiple regions as per client location needs.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-1">🏗️ Diverse Infrastructure</h3>
                    <p className="text-gray-700">We’ve built schools, factories, hospitals, roads, and more across central India.</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-1">👷 Custom Client Demands</h3>
                    <p className="text-gray-700">Every project is customized — from structure planning to material selection.</p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-1">🛣️ Easy Access Planning</h3>
                    <p className="text-gray-700">Site access, parking, and logistics planned based on local surroundings.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Head Office Location</h2>
              <div className="w-full h-[80vh] rounded overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.3001914397287!2d75.84031607508221!3d22.717081079389104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd6e7667a167%3A0xf1375bca2fdf22e6!2sRuntej%20infra!5e0!3m2!1sen!2sin!4v1749033118505!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            </div>
          </div>
        )}



        {activeTab === "plans" && (
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-2xl font-semibold mb-8">Project Layouts</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 place-items-center">
              {/* Plan 1 */}
              <div className="p-4 rounded-lg shadow-sm w-full">
                <div className="relative w-full h-64">
                  <Image
                    src="/projectdetails/floor1.jpg"
                    alt="Residential Tower Plans"
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </div>
                <p className="mt-4 text-gray-700 font-medium">
                  Residential Tower Plans
                </p>
              </div>

              {/* Plan 2 */}
              <div className="p-4 rounded-lg shadow-sm w-full">
                <div className="relative w-full h-64">
                  <Image
                    src="/projectdetails/floor2.jpg"
                    alt="Commercial Office Layout"
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </div>
                <p className="mt-4 text-gray-700 font-medium">
                  Commercial Office Layout
                </p>
              </div>
            </div>


          </div>
        )}




      </div>


    </div>
  );
}

export default ProjectDetail;
