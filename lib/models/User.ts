import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)

const jobApplicationSchema = {
  applicantName: String,
  postApplied: String,
  email: String,
  phone: String,
  location: String,
  qualifications: String,
  experience: [
    {
      company: String,
      designation: String,
      tenure: String,
      reasonForLeaving: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "reviewed", "approved", "rejected"], default: "pending" },
}

// Quote Requests Schema
const quoteRequestSchema = {
  firstName: String,
  lastName: String,
  email: String,
  lookingFor: String,
  inquiryMessage: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "responded"], default: "pending" },
}

// Get a Quotation Schema
const quotationSchema = {
  name: String,
  email: String,
  phone: String,
  projectType: String,
  pinCode: String,
  budget: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "quoted", "approved"], default: "pending" },
}

// Testimonials Schema
const testimonialSchema = {
  customerName: String,
  feedback: String,
  rating: { type: Number, min: 1, max: 5 },
  showOnWebsite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}

// Services Schema
const serviceSchema = {
  title: String,
  category: {
    type: String,
    enum: ["Housing & Residential", "Public Spaces", "Transportation", "Commercial", "Industrial"],
  },
  description: String,
  image: String, // URL to uploaded image
  subcategories: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}



export { jobApplicationSchema, quoteRequestSchema, quotationSchema, testimonialSchema, serviceSchema,  }
