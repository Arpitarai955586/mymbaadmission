import React from 'react';
import { 
  Users, Target, Award, Clock, Shield, BookOpen, Phone, Mail, MapPin, 
  Star, CheckCircle, ArrowRight, HelpCircle, ChevronDown, Search,
  TrendingUp, Headphones, GraduationCap, Home, Info, Menu, X
} from 'lucide-react';

export type IconName = 
  | 'users' | 'target' | 'award' | 'clock' | 'shield' | 'bookOpen' 
  | 'phone' | 'mail' | 'mapPin' | 'star' | 'checkCircle' | 'arrowRight'
  | 'helpCircle' | 'chevronDown' | 'search' | 'trendingUp' | 'headphones'
  | 'graduationCap' | 'home' | 'info' | 'menu' | 'x';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, size = 20, className = "" }) => {
  const iconMap = {
    users: <Users size={size} className={className} />,
    target: <Target size={size} className={className} />,
    award: <Award size={size} className={className} />,
    clock: <Clock size={size} className={className} />,
    shield: <Shield size={size} className={className} />,
    bookOpen: <BookOpen size={size} className={className} />,
    phone: <Phone size={size} className={className} />,
    mail: <Mail size={size} className={className} />,
    mapPin: <MapPin size={size} className={className} />,
    star: <Star size={size} className={className} />,
    checkCircle: <CheckCircle size={size} className={className} />,
    arrowRight: <ArrowRight size={size} className={className} />,
    helpCircle: <HelpCircle size={size} className={className} />,
    chevronDown: <ChevronDown size={size} className={className} />,
    search: <Search size={size} className={className} />,
    trendingUp: <TrendingUp size={size} className={className} />,
    headphones: <Headphones size={size} className={className} />,
    graduationCap: <GraduationCap size={size} className={className} />,
    home: <Home size={size} className={className} />,
    info: <Info size={size} className={className} />,
    menu: <Menu size={size} className={className} />,
    x: <X size={size} className={className} />
  };

  return iconMap[name] || <div className={className} />;
};

// Helper function to get icon component directly
export const getIcon = (name: IconName, size?: number, className?: string) => {
  return <DynamicIcon name={name} size={size} className={className} />;
};
