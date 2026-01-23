import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react'; // Added Phone and Mail icons
import { siteIdentity } from '../config/site';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1B] text-white pt-16 pb-8 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image 
                src={siteIdentity.logo} 
                alt={siteIdentity.name} 
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight">{siteIdentity.name}</span>
              <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{siteIdentity.tagline}</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            {siteIdentity.description}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wide uppercase">Quick Links</h3>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li><Link href="/about" className="hover:text-[#D4AC0D] transition-colors">About Us</Link></li>
            <li><Link href="/blogs" className="hover:text-[#D4AC0D] transition-colors">Blogs</Link></li>
            <li><Link href="/exams" className="hover:text-[#D4AC0D] transition-colors">Exams</Link></li>
          </ul>
        </div>

        {/* Column 3: Explore */}
        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wide uppercase">Explore</h3>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li><Link href="/terms" className="hover:text-[#D4AC0D] transition-colors">Terms Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-[#D4AC0D] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/contact" className="hover:text-[#D4AC0D] transition-colors">Contact us</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Office */}
        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wide uppercase">Contact Us</h3>
          <div className="space-y-6 text-sm text-gray-300">
            {/* Dynamic Address from Config */}
            <div className="flex gap-3">
              <MapPin size={18} className="text-[#D4AC0D] shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white mb-1">Head Office:</p>
                <p>{siteIdentity.contact.address}</p>
              </div>
            </div>

            {/* Dynamic Phone Numbers */}
            <div className="flex gap-3">
              <Phone size={18} className="text-[#D4AC0D] shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white mb-1">Call Us:</p>
                {siteIdentity.contact.phone.map((num, index) => (
                  <p key={index} className="block">{num}</p>
                ))}
              </div>
            </div>

            {/* Dynamic Email */}
            <div className="flex gap-3">
              <Mail size={18} className="text-[#D4AC0D] shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white mb-1">Email:</p>
                <p>{siteIdentity.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <a 
          href={`https://wa.me/${siteIdentity.contact.phone[0].replace(/\D/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25d366] p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-16 pt-8 border-t border-[#922B21]/30 text-center text-sm text-gray-400">
        <p>© 2026 All Rights Reserved — {siteIdentity.name}</p>
      </div>
    </footer>
  );
};

export default Footer;