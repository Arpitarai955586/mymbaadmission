"use client";
import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';
import { siteIdentity } from '../../config/site';
import { colors } from '../../config/data';
import { DynamicIcon } from '../../config/icons';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0" style={{backgroundColor: colors.background}} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{backgroundColor: colors.primary}} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{backgroundColor: colors.accent}} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold border" style={{color: colors.primary, borderColor: colors.accent}}>
              <DynamicIcon name="phone" size={20} />
              CONTACT US
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold" style={{color: colors.text}}>
              Get in <span style={{color: colors.primary}}>Touch</span> with Us
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color: colors.text}}>
              Have questions about MBA admissions? Need guidance for your career path? 
              Our expert team is here to help you achieve your dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: colors.text}}>
              Ways to <span style={{color: colors.primary}}>Connect</span>
            </h2>
            <p className="text-lg" style={{color: colors.text + '80'}}>
              Choose the most convenient way to reach us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Phone Contact */}
            <div className="bg-white rounded-2xl shadow-lg border p-8 text-center hover:shadow-xl transition-shadow" style={{borderColor: colors.primary + '20'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6" style={{backgroundColor: colors.primary}}>
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{color: colors.text}}>Call Us</h3>
              <p className="text-lg font-semibold mb-2" style={{color: colors.primary}}>
                {siteIdentity.contact.phone[0]}
              </p>
              <p className="text-sm" style={{color: colors.text + '70'}}>
                Monday - Saturday: 9:00 AM - 7:00 PM
              </p>
            </div>

            {/* Email Contact */}
            <div className="bg-white rounded-2xl shadow-lg border p-8 text-center hover:shadow-xl transition-shadow" style={{borderColor: colors.primary + '20'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6" style={{backgroundColor: colors.accent}}>
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{color: colors.text}}>Email Us</h3>
              <p className="text-lg font-semibold mb-2" style={{color: colors.primary}}>
                {siteIdentity.contact.email}
              </p>
              <p className="text-sm" style={{color: colors.text + '70'}}>
                We respond within 24 hours
              </p>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-2xl shadow-lg border p-8 text-center hover:shadow-xl transition-shadow" style={{borderColor: colors.primary + '20'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6" style={{backgroundColor: colors.primary}}>
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{color: colors.text}}>Visit Us</h3>
              <p className="text-base leading-relaxed" style={{color: colors.text + '80'}}>
                {siteIdentity.contact.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response Section */}
      <section className="py-20 px-6" style={{backgroundColor: colors.background}}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto mb-6" style={{backgroundColor: colors.accent}}>
              <MessageCircle size={32} />
            </div>
            
            <h2 className="text-3xl font-bold mb-4" style={{color: colors.text}}>
              Quick Response Guaranteed
            </h2>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{color: colors.text + '80'}}>
              Our team is committed to providing you with the best guidance and support. 
              Whether you're looking for college recommendations, application assistance, 
              or career counseling, we're here to help.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: colors.primary}}>24h</div>
                <div className="text-sm font-medium" style={{color: colors.text}}>Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: colors.primary}}>98%</div>
                <div className="text-sm font-medium" style={{color: colors.text}}>Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: colors.primary}}>15+</div>
                <div className="text-sm font-medium" style={{color: colors.text}}>Years Experience</div>
              </div>
            </div>

            <button 
              className="px-8 py-4 rounded-full text-white font-bold transition-all hover:shadow-lg active:scale-95"
              style={{backgroundColor: colors.primary}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7A2318';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
              }}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{color: colors.text}}>
            Follow <span style={{color: colors.primary}}>Us</span>
          </h2>
          <p className="text-lg mb-8" style={{color: colors.text + '80'}}>
            Stay updated with latest admission news and tips
          </p>

          <div className="flex justify-center gap-6">
            <button className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:shadow-lg border-2" style={{borderColor: colors.primary, color: colors.primary}}>
              <Globe size={24} />
            </button>
            <button className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:shadow-lg border-2" style={{borderColor: colors.primary, color: colors.primary}}>
              <MessageCircle size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
