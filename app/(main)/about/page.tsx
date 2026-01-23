"use client";
import React from 'react';
import { 
  CheckCircle, 
  Star, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  ShieldCheck, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  GraduationCap,
  LucideIcon
} from 'lucide-react';
import { siteIdentity } from '../../config/site';
import { 
  companyData, 
  teamMembers, 
  coreValues, 
  achievements, 
  contactMethods 
} from '../../config/data';

// --- Types & Interfaces ---

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
}

interface Badge {
  icon: string;
  text: string;
}

interface Achievement {
  icon: string;
  number: string;
  label: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  expertise: string;
}

interface ContactMethod {
  type: 'email' | 'phone' | 'address' | string;
  title: string;
  subtitle: string;
  value: string;
}

// --- Components ---

const IconRenderer: React.FC<IconRendererProps> = ({ name, size = 24, className = "" }) => {
  const icons: Record<string, LucideIcon> = {
    bookOpen: BookOpen,
    users: Users,
    trophy: Trophy,
    target: Target,
    shield: ShieldCheck,
    globe: Globe,
    mail: Mail,
    phone: Phone,
    mapPin: MapPin,
    graduation: GraduationCap,
    star: Star,
    check: CheckCircle
  };

  const IconComponent = icons[name] || GraduationCap; 
  return <IconComponent size={size} className={className} />;
};

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#922B21] to-[#7A2318] py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center text-white space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              About <span className="text-[#D4AC0D]">{siteIdentity.name}</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
              {companyData.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {(companyData.hero.badges as Badge[]).map((badge, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2">
                  <IconRenderer name={badge.icon} size={20} className="text-[#D4AC0D]" />
                  <span className="font-semibold">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-[#F8F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white text-[#922B21] px-4 py-2 rounded-full text-sm font-bold border border-[#D4AC0D]">
                <BookOpen size={18} />
                OUR STORY
              </div>
              <h2 className="text-4xl font-extrabold text-[#1A1A1B]">
                {companyData.story.title}
              </h2>
              {(companyData.story.description as string[]).map((paragraph, index) => (
                <p key={index} className="text-[#2C3E50] text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-4 rounded-xl border border-[#922B21]/10">
                  <div className="text-2xl font-bold text-[#922B21]">{companyData.founded}</div>
                  <div className="text-sm text-[#1A1A1B] font-semibold">Founded</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#922B21]/10">
                  <div className="text-2xl font-bold text-[#922B21]">{companyData.studentsHelped}</div>
                  <div className="text-sm text-[#1A1A1B] font-semibold">Students Helped</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-3xl shadow-2xl">
                <img 
                  src="/hero/about-image.png"
                  alt="Our Team"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#D4AC0D] text-white px-6 py-3 rounded-full font-bold shadow-lg">
                {companyData.yearsExperience} Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-[#1A1A1B]">
              Our <span className="text-[#922B21]">Core Values</span>
            </h2>
            <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as an organization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(coreValues as Value[]).map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 bg-[#922B21] rounded-2xl flex items-center justify-center text-white mx-auto">
                  <IconRenderer name={value.icon} size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1B]">{value.title}</h3>
                <p className="text-[#2C3E50] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#922B21] to-[#7A2318]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Every number represents a dream fulfilled and a future shaped.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(achievements as Achievement[]).map((achievement, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                <div className="w-16 h-16 bg-[#D4AC0D] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <IconRenderer name={achievement.icon} size={24} />
                </div>
                <div className="text-3xl font-extrabold text-white mb-2">{achievement.number}</div>
                <div className="text-white/90 font-semibold">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-[#F8F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-[#1A1A1B]">
              Meet Our <span className="text-[#922B21]">Expert Team</span>
            </h2>
            <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto">
              Our team of experienced education consultants is dedicated to your success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(teamMembers as TeamMember[]).map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#2C3E50] text-sm leading-relaxed">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-[#1A1A1B]">
              Get in <span className="text-[#922B21]">Touch</span>
            </h2>
            <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of these channels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(contactMethods as ContactMethod[]).map((contact, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg border border-[#922B21]/10 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#922B21] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <IconRenderer 
                    name={contact.type === 'email' ? 'mail' : contact.type === 'phone' ? 'phone' : 'mapPin'} 
                    size={24} 
                  />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">{contact.title}</h3>
                <p className="text-[#2C3E50] mb-4">{contact.subtitle}</p>
                <p className="text-[#922B21] font-bold">{contact.value}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#922B21] hover:bg-[#7A2318] text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 mx-auto transition-transform active:scale-95 shadow-lg shadow-[#922B21]/20">
              Get Free Counselling Session
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;