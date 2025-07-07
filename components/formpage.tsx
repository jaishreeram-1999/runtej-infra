'use client';
import React from 'react';

function FormPage() {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <div className="container px-4 my-12">
        <div className="bg-[#FFFFFF] p-10 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Get a Quotation
          </h2>

          <form className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="font-semibold mb-2">Your Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="border rounded-md px-4 py-2 w-full">
                  <option>Select</option>
                  <option>Mr</option>
                  <option>Ms</option>
                </select>
                <input type="text" placeholder="First name" className="border rounded-md px-4 py-2 w-full" />
                <input type="text" placeholder="Last name" className="border rounded-md px-4 py-2 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input type="email" placeholder="Email address" className="border rounded-md px-4 py-2 w-full" />
                <input type="tel" placeholder="Phone number" className="border rounded-md px-4 py-2 w-full" />
              </div>
            </div>

            {/* Property Info */}
            <div>
              <h3 className="font-semibold mb-2">Your Project Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Project Type */}
                <select defaultValue="Project Type" className="border rounded-md px-4 py-2 w-full">
                  <option disabled>Project Type</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>


                {/* Pin Code */}
                <input
                  type="text"
                  placeholder="Pin Code"
                  className="border rounded-md px-4 py-2 w-full"
                />

                {/* Budget */}
                <input
                  type="text"
                  placeholder="Your Budget"
                  className="border rounded-md px-4 py-2 w-full"
                />
              </div>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-md mt-6 hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default FormPage;
