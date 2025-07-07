"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);


  const menuItems = [
    { label: "OUR STORY", hasDropdown: false ,href:"/ourstory"},
    { label: "OUR IMPACT", hasDropdown: false,href:"/ourimpact" },
    { label: "OUR PROJECTS", hasDropdown: true,href:"/ourproject" },
    { label: "CAREERS", hasDropdown: false,href:"/careers" },
  ];

  const pathname = usePathname();

  const isHome = pathname === '/';

  const navbarClasses = isHome
    ? 'fixed top-0 w-full z-50 backdrop-blur-sm bg-white/40'
    : 'sticky top-0 w-full z-50 bg-white';


  return (
    <>

      <nav
        className={`flex items-center justify-between px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-black ${navbarClasses}`}
      >
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link href="/" >
            <div className="w-32 relative h-8 cursor-pointer">
              <Image
                src="/tlogo.png"
                alt="Lodha Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />

            </div>
          </Link>
        </div>

        {/* Center - Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide">

          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Main menu item */}
              <div className="flex items-center cursor-pointer hover:text-green-500 transition-all">
                <Link
                  href={item.href || "#"}
                  className="flex items-center cursor-pointer hover:text-green-500 transition-all"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>

              {/* Show dropdown on hover */}
              {item.hasDropdown && (
                <div className="absolute top-full left-0 mt-5 bg-white shadow-lg z-50 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/residentialpage" className="flex items-center justify-between px-3 py-4 hover:bg-gray-100 border-b border-gray-200">
                    <span className="text-sm text-gray-800">Residential</span>
                    <span className="text-gray-400 text-sm">{'>'}</span>
                  </Link>
                  <a href="/commercialpage" className="flex items-center justify-between px-3 py-4 hover:bg-gray-100 border-b border-gray-200">
                    <span className="text-sm text-gray-800">Commercial</span>
                    <span className="text-gray-400 text-sm">{'>'}</span>
                  </a>
                  <a href="/industrialpage" className="flex items-center justify-between px-3 py-4 hover:bg-gray-100">
                    <span className="text-sm text-gray-800">Industrial</span>
                    <span className="text-gray-400 text-sm">{'>'}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>


        {/* Right - Actions */}
        <div className="flex items-center space-x-6 text-sm">
          <a href="#" className="hidden md:flex items-center hover:text-green-500 font-semibold transition">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 4h2a2 2 0 012 2v14l-6-3-6 3V6a2 2 0 012-2h2"
              />
            </svg>
            ENQUIRE
          </a>

          <a href="#" className="hidden md:inline font-semibold hover:text-green-500">CHAT</a>

          <a href="#" className="hidden md:flex items-center font-semibold hover:text-green-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
              />
            </svg>
            <span className="ml-2">SEARCH</span>
          </a>



          {/* Hamburger Icon */}
          <div
            onClick={() => setIsOpen(true)}
            className="text-black text-2xl font-bold  cursor-pointer md:hidden"
          >
            &#9776;
          </div>
        </div>

      </nav>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm text-white flex flex-col justify-between px-6 py-8">

          {/* Close Button */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-3xl font-light"
            >
              &times;
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-6 text-xl mt-8">
            <Link href="/ourstory" className="hover:text-green-500">OUR STORY</Link>
            <Link href="#" className="hover:text-green-500">OUR IMPACT</Link>

            <div>
              <button
                className="flex items-center hover:text-green-500 w-full text-left"
                onClick={() => setOpen(!open)}
              >
                OUR PROJECTS
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <div className="ml-4 mt-2 space-y-2 text-base text-white">
                  <div>
                    <Link href="/commercial" className="block hover:text-green-500">Commercial</Link>
                    <Link href="/industrial" className="block hover:text-green-500">Industrial</Link>
                    <Link href="/residential" className="block hover:text-green-500">Residential</Link>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="hover:text-green=500">CAREERS</a>
          </div>

          {/* Bottom Actions */}
          <div className="flex md:hidden justify-around mt-8 text-sm border-t border-gray-700 pt-6">
            <a href="#" className="flex items-center hover:text-green-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 4h2a2 2 0 012 2v14l-6-3-6 3V6a2 2 0 012-2h2" />
              </svg>
              ENQUIRY
            </a>
            <a href="#" className="hover:text-green-500">CALL</a>
            <a href="#" className="hover:text-green-500">CHAT</a>
          </div>
        </div>
      )}


    </>
  );
}
