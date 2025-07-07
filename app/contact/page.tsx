"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

function ContactPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <main className=" bg-gray-50 min-h-screen " ref={sectionRef}>
     
     {/* Hero Image Section */}
           <section className="relative w-full h-64 mb-12">
             <Image
               src="/contactus.jpg"
               alt="Construction Site"
               fill
               className="object-cover rounded-lg shadow"
             />
     
             <div className="absolute inset-0 bg-[#00000081] bg-opacity-40 flex items-center justify-center">
               <h1 className="text-3xl md:text-4xl font-bold text-white">
                 CONTACT US
               </h1>
             </div>
           </section>
     
      <section className="container max-w-5xl mx-auto bg-white shadow-lg p-10 rounded-2xl">
        <h2 className="text-center text-md text-green-600 font-semibold uppercase tracking-wide mb-2">
          Contact Us
        </h2>
        <h3 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Request a quote
        </h3>
        <p className="text-center text-base text-gray-500 mb-10">
          Have a question or want to collaborate? Tell us more about your needs, and our team will be in touch to help you take the next step.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="First Name*" className="border-b p-3 text-sm" required />
          <input type="text" placeholder="Last Name*" className="border-b p-3 text-sm" required />
          
          <input type="email" placeholder="Work Email (Optional)" className="border-b p-3 text-sm md:col-span-2"  />
          <select className="border-b p-3 text-sm md:col-span-2" required>
            <option value="">What are you looking for?</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Partnerships">Partnerships</option>
          </select>
          <textarea
            placeholder="Tell us more about your inquiry (Optional)"
            className="border-b p-3 text-sm md:col-span-2"
            rows={4}
          ></textarea>
          <label className="flex items-start space-x-2 text-xs text-black md:col-span-2">
            <input type="checkbox" className="mt-1" required />
            <span>
              By checking this box, you consent to receiving updates, insights, and promotional communications. Your information will be handled in accordance with our{' '}
              <a href="#" className="text-rose-600 underline">Privacy Policy</a> and{' '}
              <a href="#" className="text-rose-600 underline">Terms & Conditions</a>. You may unsubscribe at any time.
            </span>
          </label>
          <button
            type="submit"
            className="mt-4 flex items-center bg-green-600 text-white hover:bg-green-700 font-bold py-3 px-6 rounded-3xl transition md:col-span-2 justify-center"
          >
             Submit
          </button>
        </form>
      </section>

      <section className="bg-gray-900 text-white py-10 mt-16 text-center rounded-xl mx-10">
        <h4 className="text-2xl font-bold mb-2">Request a call</h4>
        <p className="text-base mb-4">If you&apos;re looking to explore our platform and offerings, you can book a 1:1 consultation with us.</p>
        <a href="#" className="text-yellow-400 underline text-sm font-semibold hover:text-yellow-500">+91 7986546464</a>
      </section>

      <section className="mt-15 ">
         <div className="w-full h-[450px]">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.3001914397287!2d75.84031607530477!3d22.7170810793891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd6e7667a167%3A0xf1375bca2fdf22e6!2sRuntej%20infra!5e0!3m2!1sen!2sin!4v1751865411465!5m2!1sen!2sin"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
      </section>
    </main>
  );
}

export default ContactPage;
