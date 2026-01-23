"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../Context/ModalContext';
import { colors } from '../config/data';
import { X, ChevronRight } from 'lucide-react';

// Define the shape of your form state
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  city: string;
}

const Modal: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    city: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit");
      }
      
      alert("✅ Enquiry Sent Successfully!");
      setFormData({ fullName: '', email: '', phone: '', course: '', city: '' });
      closeModal();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Get Guidance</h2>
                <p className="text-sm mt-1" style={{ color: `${colors.text}80` }}>
                  Fill out the form and we'll contact you shortly.
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Form Body */}
            <form className="p-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 outline-none transition-all"
                  style={{
                    borderColor: `${colors.text}30`,
                    color: colors.text,
                  }}
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      borderColor: `${colors.text}30`,
                      color: colors.text,
                    }}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      borderColor: `${colors.text}30`,
                      color: colors.text,
                    }}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Interested Course</label>
                <select 
                  name="course"
                  required
                  className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    borderColor: `${colors.text}30`,
                    color: colors.text,
                    backgroundColor: 'white'
                  }}
                  value={formData.course}
                  onChange={handleInputChange}
                >
                  <option value="">Select a course</option>
                  <option value="engineering">Engineering</option>
                  <option value="management">Management</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Current City</label>
                <input 
                  type="text" 
                  name="city"
                  placeholder="Enter your city"
                  className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    borderColor: `${colors.text}30`,
                    color: colors.text,
                  }}
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                style={{
                  backgroundColor: colors.primary,
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7A2318';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.primary;
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
                {!isSubmitting && <ChevronRight size={18} />}
              </button>

              <p className="text-center text-[11px] pt-2" style={{ color: `${colors.text}60` }}>
                By submitting, you agree to our terms and privacy policy.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;