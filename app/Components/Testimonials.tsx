"use client";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { themeColors, colorCombos, themeClasses } from '../config/theme';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "Vikram Singh", image: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"Immediate response after lead submission, detailed counseling, and clear college options. The process was smooth!"', rating: 5 },
  { id: 2, name: "Priya Gupta", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"Amazing guidance and trusted support from start to finish. They made college admission easy and helped me achieve goals."', rating: 5 },
  { id: 3, name: "Aarav Sharma", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"The team provided excellent personalized guidance. They connected quickly and helped me secure my dream college!"', rating: 5 },
  { id: 4, name: "Simran Kaur", image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"Outstanding service! Detailed college data and quick support after lead submission made the process stress-free."', rating: 5 },
  { id: 5, name: "Rahul Verma", image: "https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"I was confused about my career path, but their counselors provided the clarity I needed to choose the right university."', rating: 5 },
  { id: 6, name: "Ananya Iyer", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"The best platform for admission help. The documentation support and visa guidance were top-notch and professional."', rating: 5 },
  { id: 7, name: "Arjun Reddy", image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"Reliable and transparent. They don\'t just give info; they stay with you until the admission is confirmed. Five stars!"', rating: 5 },
  { id: 8, name: "Sneha Patil", image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", text: '"Very helpful for engineering aspirants. They helped me compare colleges based on placement records and ROI accurately."', rating: 5 },
];

const TestimonialsSection = () => {
  // 1. Initialize Embla with options (slidesToScroll: 1, loop: true)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <section className="bg-[#F8F9F9] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            TESTIMONIALS
          </div>
          <h2 className="text-4xl font-bold text-[#1A1A1B] mb-4">
            What Students Say About GetAdmissionInfo
          </h2>
          <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto mb-6">
            Real students share their experience with our admission guidance, college data and counselling services.
          </p>
          
          <div className="inline-flex items-center gap-2">
            <span className="font-bold text-[#1A1A1B] text-lg">4.8</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#F97316] text-[#F97316]" />
              ))}
            </div>
            <span className="text-[#2C3E50] font-medium ml-1">(Based on 5,200+ Reviews)</span>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative px-4">
          {/* Navigation Arrows */}
          <button 
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full text-[#1A1A1B] hover:bg-[#F8F9F9] transition-colors hidden xl:flex border border-[#1E40AF]"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full text-[#1A1A1B] hover:bg-[#F8F9F9] transition-colors hidden xl:flex border border-[#1E40AF]"
          >
            <ChevronRight size={24} />
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_25%] px-3"
                >
                  <div className="bg-white rounded-2xl p-8 h-full flex flex-col items-center text-center shadow-sm border border-[#1E40AF]/10">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-[#F97316]/20 shadow-sm">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover bg-slate-100"
                      />
                    </div>
                    <p className="text-[#2C3E50] text-sm leading-relaxed mb-6 flex-grow italic">
                      {testimonial.text}
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-bold text-[#1A1A1B] text-base mb-1">{testimonial.name}</h4>
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-[#F97316] text-[#F97316]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2.5 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? 'w-8' : 'w-2.5'
                }`}
                style={{
                  backgroundColor: index === selectedIndex ? themeColors.primary : `${themeColors.accent}30`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;