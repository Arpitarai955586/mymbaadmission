"use client";
import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, Cookie, Download, Trash2 } from 'lucide-react';
import { siteIdentity } from '../../config/site';
import { colors } from '../../config/data';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: colors.background}} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{backgroundColor: colors.primary}} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold border" style={{color: colors.primary, borderColor: colors.accent}}>
              <Shield size={20} />
              PRIVACY POLICY
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold" style={{color: colors.text}}>
              Your <span style={{color: colors.primary}}>Privacy</span> Matters
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color: colors.text + '80'}}>
              How {siteIdentity.name} collects, uses, and protects your personal information.
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
                  <Shield size={24} style={{color: colors.primary}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Our Commitment to Privacy</h2>
              </div>
              <p className="leading-relaxed" style={{color: colors.text + '80'}}>
                At {siteIdentity.name}, we are committed to protecting your personal information and ensuring 
                your privacy. This Privacy Policy explains how we collect, use, store, and protect your data 
                when you use our MBA admission guidance services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.accent + '20'}}>
                  <Database size={24} style={{color: colors.accent}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2" style={{color: colors.text}}>Personal Information</h3>
                  <ul className="space-y-1" style={{color: colors.text + '80'}}>
                    <li>• Full name and contact details</li>
                    <li>• Email address and phone number</li>
                    <li>• Educational background and qualifications</li>
                    <li>• Career goals and preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2" style={{color: colors.text}}>Usage Information</h3>
                  <ul className="space-y-1" style={{color: colors.text + '80'}}>
                    <li>• Website interactions and navigation patterns</li>
                    <li>• Service usage and preferences</li>
                    <li>• Communication history with our team</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary + '20'}}>
                  <Eye size={24} style={{color: colors.primary}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>How We Use Your Information</h2>
              </div>
              <div className="space-y-3" style={{color: colors.text + '80'}}>
                <p>• To provide personalized MBA admission guidance</p>
                <p>• To recommend suitable colleges and programs</p>
                <p>• To assist with application processes</p>
                <p>• To communicate important updates and information</p>
                <p>• To improve our services and user experience</p>
                <p>• To comply with legal and regulatory requirements</p>
              </div>
            </div>

            {/* Data Protection */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.accent + '20'}}>
                  <Lock size={24} style={{color: colors.accent}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Data Protection & Security</h2>
              </div>
              <p className="leading-relaxed mb-4" style={{color: colors.text + '80'}}>
                We implement robust security measures to protect your personal information:
              </p>
              <div className="space-y-3" style={{color: colors.text + '80'}}>
                <p>• Secure data encryption and storage</p>
                <p>• Restricted access to personal information</p>
                <p>• Regular security audits and updates</p>
                <p>• Secure communication channels</p>
                <p>• Compliance with data protection regulations</p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary + '20'}}>
                  <UserCheck size={24} style={{color: colors.primary}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Your Privacy Rights</h2>
              </div>
              <div className="space-y-3" style={{color: colors.text + '80'}}>
                <p>• <strong>Access:</strong> Request access to your personal information</p>
                <p>• <strong>Correction:</strong> Update or correct inaccurate information</p>
                <p>• <strong>Deletion:</strong> Request deletion of your personal data</p>
                <p>• <strong>Portability:</strong> Request transfer of your data</p>
                <p>• <strong>Objection:</strong> Object to processing of your information</p>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.accent + '20'}}>
                  <Cookie size={24} style={{color: colors.accent}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Cookies & Tracking</h2>
              </div>
              <p className="leading-relaxed" style={{color: colors.text + '80'}}>
                We use cookies and similar technologies to enhance your experience, analyze website usage, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* Third-Party Sharing */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary + '20'}}>
                  <Download size={24} style={{color: colors.primary}} />
                </div>
                <h2 className="text-2xl font-bold" style={{color: colors.text}}>Third-Party Sharing</h2>
              </div>
              <p className="leading-relaxed" style={{color: colors.text + '80'}}>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as required by law or necessary to provide our services. 
                We may share information with trusted partners who assist in service delivery under strict confidentiality agreements.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mt-16 p-6 rounded-xl" style={{backgroundColor: colors.background}}>
              <h3 className="text-lg font-bold mb-3" style={{color: colors.text}}>Privacy Questions?</h3>
              <p className="mb-2" style={{color: colors.text + '80'}}>
                If you have any questions about this Privacy Policy or your data rights, please contact us:
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

export default PrivacyPage;
