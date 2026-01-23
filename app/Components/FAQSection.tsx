"use client";
import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Phone, Mail, MessageCircle } from 'lucide-react';
import { faqData, contactMethods, colors } from '../config/data';
import { siteIdentity } from '../config/site';
import { DynamicIcon } from '../config/icons';
import { themeColors, colorCombos, themeClasses } from '../config/theme';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Dynamically extract unique categories from data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(faqData.map(f => f.category)));
    return ["All", ...uniqueCategories];
  }, []);

  // 2. Dynamic Filtering Logic
  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // 3. Dynamic Column Splitting
  const leftCol = filteredFAQs.filter((_, i) => i % 2 === 0);
  const rightCol = filteredFAQs.filter((_, i) => i % 2 !== 0);

  const FAQItem = ({ faq }: { faq: typeof faqData[0] }) => {
    const isOpen = activeIndex === faq.id;

    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-4 h-fit transition-all hover:shadow-md">
        <button
          onClick={() => setActiveIndex(isOpen ? null : faq.id)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
          aria-expanded={isOpen}
        >
          <span className={`font-semibold text-sm md:text-base pr-4 ${isOpen ? "" : "text-slate-800"}`} style={{color: isOpen ? themeColors.primary : undefined}}>
            {faq.question}
          </span>
          <ChevronDown 
            size={18} 
            className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{color: isOpen ? themeColors.primary : "rgb(148 163 184)"}}
          />
        </button>
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 pt-0 text-sm md:text-base text-slate-600 border-t border-slate-50 leading-relaxed">
            {faq.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-slate-50 py-16 px-4 min-h-[700px]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316] mb-4">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Got <span className="text-[#1E40AF]">Questions?</span>
            </h2>
            <p className="text-slate-500 mt-2">Find quick answers to common admission queries.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#1E40AF]/20 outline-none transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
        </div>

        {/* Dynamic Category Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(null); // Close active FAQ when switching categories
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                selectedCategory === cat 
                ? " shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
              style={{
                backgroundColor: selectedCategory === cat ? themeColors.primary : undefined,
                color: selectedCategory === cat ? 'white' : undefined,
                borderColor: selectedCategory === cat ? themeColors.primary : undefined
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid Results */}
        {filteredFAQs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 items-start">
            <div className="flex flex-col">
              {leftCol.map((faq) => <FAQItem key={faq.id} faq={faq} />)}
            </div>
            <div className="flex flex-col">
              {rightCol.map((faq) => <FAQItem key={faq.id} faq={faq} />)}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">No matches found for "{searchQuery}"</p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
              className="mt-2 text-sm font-bold hover:underline"
              style={{color: themeColors.primary}}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Contact Support Section */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 py-8 border-t border-slate-200">
          {contactMethods.map((contact) => (
            <div 
              key={contact.id}
              className={`flex items-center gap-3 text-slate-700 transition-colors ${
                contact.type === 'phone' ? 'cursor-pointer hover:text-[#1E40AF]' : ''
              }`}
              style={{color: contact.type === 'phone' ? themeColors.primary : undefined}}
            >
              <span style={{color: themeColors.primary}}>
                <DynamicIcon name={contact.type as any} size={20} />
              </span>
              <span className="font-semibold">{contact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;