"use client";
import React from 'react';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import { siteIdentity } from '../config/site';
import { whyChooseUsFeatures, benefits, stats, colors } from '../config/data';
import { DynamicIcon } from '../config/icons';

const WhyChooseUs = () => {

  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#F8F9F9] opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#922B21]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AC0D]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#922B21] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#D4AC0D]">
            <DynamicIcon name="award" size={20} />
            WHY CHOOSE US
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1B] leading-tight">
            The Smartest Way to <span style={{color: colors.primary}}>Get Admission</span> <br />
            in Your <span style={{color: colors.accent}}>Dream College</span>
          </h2>
          
          <p className="text-[#2C3E50] text-xl max-w-3xl mx-auto leading-relaxed">
            We combine technology, expertise, and personalized care to make your admission journey 
            smooth and successful. Join thousands of students who got into their dream colleges with us.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-[#922B21]/10 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-extrabold mb-2" style={{color: colors.primary}}>{stat.number}</div>
              <div className="text-[#1A1A1B] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {whyChooseUsFeatures.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(146,43,33,0.08)] hover:shadow-[0_20px_60px_rgba(146,43,33,0.15)] transition-all duration-300 hover:-translate-y-2 border border-[#922B21]/10"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${
                feature.color === 'primary' ? '' : ''
              } rounded-2xl flex items-center justify-center text-white mb-6`} style={{backgroundColor: feature.color === 'primary' ? colors.primary : colors.accent}}>
                <DynamicIcon name={feature.icon as any} size={28} />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4">
                {feature.title}
              </h3>
              
              <p className="text-[#2C3E50] leading-relaxed mb-6">
                {feature.description}
              </p>
              
              {/* Check Items */}
              <div className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm font-medium" style={{color: colors.primary}}>
                    <CheckCircle size={16} style={{color: colors.accent}} />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-[#922B21] to-[#7A2318] rounded-3xl p-12 text-white mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-extrabold mb-6">
                What You Get With GetAdmissionInfo
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Everything you need for a successful admission journey, all in one place.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#D4AC0D] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4AC0D] rounded-full flex items-center justify-center">
                      <DynamicIcon name="target" size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="opacity-90">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[#F8F9F9] rounded-3xl p-12 border-2 border-[#D4AC0D]">
          <h3 className="text-3xl font-extrabold text-[#1A1A1B] mb-4">
            Ready to Start Your Admission Journey?
          </h3>
          <p className="text-[#2C3E50] text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who got into their dream colleges with our expert guidance.
          </p>
          
          <button className="bg-[#922B21] hover:bg-[#7A2318] text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 mx-auto transition-transform active:scale-95 shadow-lg shadow-[#922B21]/20">
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
