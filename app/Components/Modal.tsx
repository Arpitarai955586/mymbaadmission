"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../Context/ModalContext';
import { X, Users, Target, Award, MapPin, BookOpen, ChevronRight } from 'lucide-react';

const Modal = () => {
  const { isModalOpen, closeModal } = useModal();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    city: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form Submitted:', formData);
  //   console.log('Full Name:', formData.fullName);
  //   console.log('Email:', formData.email);
  //   console.log('Phone:', formData.phone);
  //   console.log('Course:', formData.course);
  //   console.log('City:', formData.city);
    
  //   // You can also close the modal after submission if needed
  //   // closeModal();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit enquiry");
    }

    alert("✅ Your free session has been booked!");
    
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      course: '',
      city: ''
    });

    closeModal(); // optional
  } catch (err: any) {
    console.error("❌ Enquiry error:", err);
    alert(err.message);
  }
};


  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed text-black inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1A1A1B]/80 backdrop-blur-md"
            onClick={closeModal}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[95vh]"
          >
            {/* Close Button - More visible on all backgrounds */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 z-20 bg-white/10 hover:bg-white/20 lg:bg-[#F8F9F9] lg:hover:bg-[#D4AC0D]/20 backdrop-blur-md rounded-full p-2.5 transition-all active:scale-90"
            >
              <X size={20} className="text-white lg:text-[#1A1A1B]" />
            </button>

            {/* Left Column: Social Proof & Stats */}
            <div className="lg:w-2/5 bg-[#922B21] bg-gradient-to-br from-[#922B21] via-[#7A2318] to-[#1A1A1B] text-white p-10 flex flex-col justify-center">
              <div className="space-y-2 mb-10">
                <span className="bg-[#D4AC0D]/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Personalized Counseling
                </span>
                <h2 className="text-4xl font-extrabold leading-tight">
                  Start Your <br /> Journey Today
                </h2>
                <p className="text-white/80 text-sm">Join thousands of students achieving their dreams.</p>
              </div>
              
              <div className="space-y-8">
                {[
                  { icon: <Users />, label: "13K+ Offers", sub: "Global University placements" },
                  { icon: <Target />, label: "95% Success", sub: "Admission conversion rate" },
                  { icon: <Award />, label: "98% Visa", sub: "Hassle-free visa approvals" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="bg-white/10 group-hover:bg-white/20 transition-colors rounded-2xl p-4 flex-shrink-0 backdrop-blur-sm border border-white/10">
                      {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 24 })}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl leading-none mb-1">{stat.label}</h3>
                      <p className="text-white/70 text-xs">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-3/5 p-10 lg:p-14 overflow-y-auto">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1A1A1B]">Book a Free Session</h3>
                <p className="text-[#2C3E50] text-sm">Fill in the details below to get a call back from our experts.</p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="md:col-span-2">
                  <FormLabel>Full Name</FormLabel>
                  <input 
                    type="text" 
                    name="fullName"
                    className="form-input" 
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormLabel>Email Address</FormLabel>
                  <input 
                    type="email" 
                    name="email"
                    className="form-input" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#922B21]/30 bg-[#F8F9F9] text-[#2C3E50] text-xs font-bold">
                      +91
                    </span>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-input rounded-l-none" 
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <FormLabel>Interested Course</FormLabel>
                  <div className="relative">
                    <select 
                      name="course"
                      className="form-input appearance-none"
                      value={formData.course}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <option value="engineering">Engineering</option>
                      <option value="management">Management</option>
                    </select>
                    <BookOpen className="absolute right-4 top-3.5 text-[#922B21] pointer-events-none" size={18} />
                  </div>
                </div>

                <div>
                  <FormLabel>Current City</FormLabel>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="city"
                      className="form-input" 
                      placeholder="Search city..."
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <MapPin className="absolute right-4 top-3.5 text-[#922B21] pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="group w-full bg-[#922B21] hover:bg-[#7A2318] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#922B21]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    BOOK MY FREE SESSION
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] text-[#2C3E50] mt-4 italic">
                    *By clicking, you agree to our Terms and Privacy Policy.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper Sub-component for clean labels
const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-bold text-[#1A1A1B] uppercase tracking-wider mb-2">
    {children}
  </label>
);

export default Modal;