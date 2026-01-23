"use client";
import React from 'react';
import { Shield, Eye, Lock, AlertCircle, Users, FileText } from 'lucide-react';
import { siteIdentity } from '../../config/site';
import { colors } from '../../config/data';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: colors.background}} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{backgroundColor: colors.primary}} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold border" style={{color: colors.primary, borderColor: colors.accent}}>
              <FileText size={20} />
              LEGAL INFORMATION
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold" style={{color: colors.text}}>
              Terms & <span style={{color: colors.primary}}>Conditions</span>
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color: colors.text + '80'}}>
              Please read these terms carefully before using {siteIdentity.name} services.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border p-12" style={{borderColor: colors.primary + '20'}}>
            
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary + '20'}}>
                  <FileText size={24} style={{color: colors.primary}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Introduction</h2>
              </div>
              <p className="leading-relaxed" style={{color: colors.text + '80'}}>
                Welcome to {siteIdentity.name}. These Terms and Conditions govern your use of our MBA admission guidance services 
                and website. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </div>

            {/* Services */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.accent + '20'}}>
                  <Users size={24} style={{color: colors.accent}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Our Services</h2>
              </div>
              <div className="space-y-3" style={{color: colors.text + '80'}}>
                <p>• MBA admission guidance and counseling</p>
                <p>• College search and recommendation services</p>
                <p>• Application assistance and document review</p>
                <p>• Career counseling and guidance</p>
                <p>• Workshop and seminar services</p>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary + '20'}}>
                  <Shield size={24} style={{color: colors.primary}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>User Responsibilities</h2>
              </div>
              <div className="space-y-3" style={{color: colors.text + '80'}}>
                <p>• Provide accurate and complete information</p>
                <p>• Maintain confidentiality of your account credentials</p>
                <p>• Use our services for legitimate educational purposes</p>
                <p>• Respect intellectual property rights</p>
                <p>• Follow all applicable laws and regulations</p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.accent + '20'}}>
                  <Lock size={24} style={{color: colors.accent}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Payment Terms</h2>
              </div>
              <div className="space-y-3" style={{color: colors.text + '80'}}>
                <p>• All fees are clearly communicated before service commencement</p>
                <p>• Payment methods include online transfer, UPI, and cash</p>
                <p>• Refund policy applies as per service agreement</p>
                <p>• Additional charges may apply for premium services</p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary + '20'}}>
                  <AlertCircle size={24} style={{color: colors.primary}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Limitation of Liability</h2>
              </div>
              <p className="leading-relaxed" style={{color: colors.text + '80'}}>
                {siteIdentity.name} provides guidance based on available information and educational expertise. 
                While we strive for accuracy, we cannot guarantee admission outcomes. Final admission decisions 
                rest with the respective educational institutions.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mt-16 p-6 rounded-xl" style={{backgroundColor: colors.background}}>
              <h3 className="text-lg font-bold mb-3" style={{color: colors.text}}>Questions?</h3>
              <p className="mb-2" style={{color: colors.text + '80'}}>
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-1" style={{color: colors.primary}}>
                <p><strong>Email:</strong> {siteIdentity.contact.email}</p>
                <p><strong>Phone:</strong> {siteIdentity.contact.phone[0]}</p>
                <p><strong>Address:</strong> {siteIdentity.contact.address}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t" style={{borderColor: colors.text + '20'}}>
              <p className="text-sm text-center" style={{color: colors.text + '60'}}>
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
