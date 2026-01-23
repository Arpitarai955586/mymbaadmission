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
import { themeColors, colorCombos, themeClasses } from '../../config/theme';
import { 
  companyData, 
  teamMembers, 
  coreValues, 
  achievements, 
  contactMethods 
} from '../../config/data';
import { useModal } from '@/app/Context/ModalContext';

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

  const { openModal } = useModal();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center text-white space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-[#F97316] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              ABOUT US
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              About <span className="text-[#F97316]">{siteIdentity.name}</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
              {companyData.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {(companyData.hero.badges as Badge[]).map((badge, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2">
                  <IconRenderer name={badge.icon} size={20} className="text-[#F97316]" />
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
              <div className="inline-flex items-center gap-2 bg-white text-[#1E40AF] px-4 py-2 rounded-full text-sm font-bold border border-[#F97316]">
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
                <div className="bg-white p-4 rounded-xl border border-[#1E40AF]/10">
                  <div className="text-2xl font-bold text-[#1E40AF]">{companyData.founded}</div>
                  <div className="text-sm text-[#1A1A1B] font-semibold">Founded</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#1E40AF]/10">
                  <div className="text-2xl font-bold text-[#1E40AF]">{companyData.studentsHelped}</div>
                  <div className="text-sm text-[#1A1A1B] font-semibold">Students Helped</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 bg-[#F97316] text-white px-6 py-3 rounded-full font-bold shadow-lg">
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
            <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              CORE VALUES
            </div>
            <h2 className="text-4xl font-extrabold text-[#1A1A1B]">
              Our <span className="text-[#1E40AF]">Core Values</span>
            </h2>
            <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as an organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(coreValues as Value[]).map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 bg-[#1E40AF] rounded-2xl flex items-center justify-center text-white mx-auto">
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
      <section className="py-20 px-6 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-[#F97316] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316] mb-4">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              ACHIEVEMENTS
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Our Numbers Speak
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              We're proud of our impact on students' lives and the education community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(achievements as Achievement[]).map((achievement, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <IconRenderer name={achievement.icon} size={24} />
                </div>
                <div className="text-3xl font-extrabold text-white mb-2">{achievement.number}</div>
                <div className="text-white/90 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-[#F8F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              TEAM
            </div>
            <h2 className="text-4xl font-extrabold text-[#1A1A1B]">
              Meet Our <span className="text-[#1E40AF]">Expert Team</span>
            </h2>
            <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto">
              Our team of experienced education consultants is dedicated to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(teamMembers as TeamMember[]).map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">{member.name}</h3>
                  <p className="text-[#1E40AF] font-semibold mb-3">{member.role}</p>
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
            <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              CONTACT
            </div>
            <h2 className="text-4xl font-extrabold text-[#1A1A1B]">
              Get in <span className="text-[#1E40AF]">Touch</span>
            </h2>
            <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of these channels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(contactMethods as ContactMethod[]).map((contact, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg border border-[#1E40AF]/10 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <IconRenderer 
                    name={contact.type === 'email' ? 'mail' : contact.type === 'phone' ? 'phone' : 'mapPin'} 
                    size={24} 
                  />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">{contact.title}</h3>
                <p className="text-[#2C3E50] mb-4">{contact.subtitle}</p>
                <p className="text-[#1E40AF] font-bold">{contact.value}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div onClick={openModal} className="inline-flex items-center gap-2 bg-[#F97316] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#EA580C] transition-colors">
              <Mail size={20} />
              Start Your Journey Today
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;