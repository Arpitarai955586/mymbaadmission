import React from 'react';
import { Users, Building2, GraduationCap } from 'lucide-react';

interface AchievementProps {
  icon: React.ReactNode;
  count: string;
  label: string;
}

const AchievementCard = ({ icon, count, label }: AchievementProps) => (
  <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(146,43,33,0.08)] hover:shadow-[0_20px_60px_rgba(146,43,33,0.12)] transition-shadow duration-300 border border-[#922B21]/10">
    {/* Icon Circle */}
    <div className="w-16 h-16 bg-[#922B21] rounded-full flex items-center justify-center text-white mb-6">
      {icon}
    </div>
    
    {/* Numbers */}
    <h3 className="text-[#922B21] text-5xl font-extrabold mb-2 tracking-tight">
      {count}
    </h3>
    
    {/* Label */}
    <p className="text-[#1A1A1B] text-xl font-bold mb-4">
      {label}
    </p>
    
    {/* Blue Decorative Underline */}
    <div className="w-12 h-1.5 bg-[#D4AC0D] rounded-full" />
  </div>
);

const Achievements = () => {
  const stats = [
    {
      icon: <Users size={32} />,
      count: "25000+",
      label: "Students Guided"
    },
    {
      icon: <Building2 size={32} />,
      count: "850+",
      label: "Colleges Listed"
    },
    {
      icon: <GraduationCap size={32} />,
      count: "12000+",
      label: "Admissions Completed"
    }
  ];

  return (
    <section className="bg-[#F8F9F9] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1B]">
            Our Achievements
          </h2>
          <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering trusted guidance and verified college information to thousands of students every year.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <AchievementCard 
              key={index}
              icon={stat.icon}
              count={stat.count}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;