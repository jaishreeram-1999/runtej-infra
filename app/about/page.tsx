'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function About() {
  const headerRef = useRef(null);
  const visionRef = useRef(null);
  const founderRef = useRef(null);

  useEffect(() => {
    // Header section: fade in & slide from bottom
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 60,
      duration: 1.3,
      ease: 'power4.out',
    });

    // Vision section: fade in & slide from left
    gsap.from(visionRef.current, {
      opacity: 0,
      x: -100,
      duration: 1.4,
      delay: 0.3,
      ease: 'power2.out',
    });

    // Founder section: zoom-in + fade
    gsap.from(founderRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 1.4,
      delay: 0.6,
      ease: 'back.out(1.7)',
    });
  }, []);

  return (
    <main className="bg-[#f6f9fc] text-gray-800">

      {/* Top Section */}
      <section ref={headerRef} className="bg-gradient-to-b from-[#002d42] to-[#005b74] text-white px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">About Us</h2>
            <p className="text-base leading-relaxed mb-4">
             Runtej Infra is built with one goal: to provide strong, beautiful, and trusted buildings / Structures for everyone. We work in Infrastructural Industry with years of experience in Constructing, Developing and Delivering top-quality homes and commercial spaces..
            </p>
            <p className="text-base leading-relaxed">
              Our team believes in smart design, strong materials, and on-time delivery. From planning to finishing, Runtej Infra helps make your dream spaces real. 
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/about/aboutheader.png"
              alt="App and person"
              width={350}
              height={350}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section ref={visionRef} className="relative z-10 bg-white px-6 md:px-12 lg:px-20 pt-16 pb-20 rounded-t-[2.5rem] -mt-10 shadow-xl">
        <div className="max-w-8xl mx-auto grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src="/about/mission.png"
              alt="Vision Mission Illustration"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-10 text-center lg:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">OUR MISSION</h3>
              <p className="text-gray-600">
               To become a trusted name in the Infrastructural industry (Construction & Development industry) by delivering high-quality, durable, and modern spaces that improve people’s lives and build stronger communities.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">OUR VISION</h3>
              <p className="text-gray-600">
               To provide safe, strong, and affordable homes, offices, and commercial spaces. We focus on using the best materials, smart designs, and on-time project delivery while keeping customer satisfaction at the heart of everything we do. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section ref={founderRef} className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-20 gap-10">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-semibold mb-6">MEET OUR FOUNDER</h1>
          <p className="text-lg mb-4">
           Runtej Infra was started with one vision — to offer strong, smart and beautiful buildings, Roads and Spaces that create difference. Our founder,<strong> Mr. Gagandeep Singh Tuteja, </strong>began this journey with deep passion and belief in meaningful construction.
          </p>
          <p className="text-base text-gray-700 mb-4">
            His story began as a young civil engineer with dreams bigger than blueprints. He worked on small residential projects and gradually built a reputation for honesty, design quality, and strength. Over the years, his leadership turned a small firm into a trusted name in Construction and Infrastructural Development Industry. 
          </p>
          <p className="text-base text-gray-700 mb-4">
           Today, <strong>Mr. Gagandeep Singh Tuteja</strong> leads with experience and vision. Under his guidance, Runtej Infra continues to grow with commitment to timely delivery, budget-friendly planning, and architectural excellence.
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition">
            Explore Our Work
          </button>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-130 h-[620px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/about/founder.jpg" // Make sure this path is correct
              alt="Founder"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
