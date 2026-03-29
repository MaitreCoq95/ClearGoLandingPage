'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- TYPES ---
export interface CarouselSlide {
  step: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  items: string[];
  note: string;
  accent: string;
  icon: React.ReactNode;
  image?: string; // optional background image path
}

interface FeatureCarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle: string;
  slides: CarouselSlide[];
}

// --- SLIDE CARD ---
const SlideCard = ({ slide, isCenter }: { slide: CarouselSlide; isCenter: boolean }) => (
  <div
    className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10"
    style={{
      background: '#07121E',
      boxShadow: isCenter ? '0 32px 64px -16px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)' : 'none',
    }}
  >
    {/* Background image */}
    {slide.image && (
      <>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{ backgroundImage: `url(${slide.image})`, transform: isCenter ? 'scale(1.04)' : 'scale(1)' }}
        />
        {/* Strong overlay — image visible top, solid dark bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,18,30,0.25) 0%, rgba(7,18,30,0.65) 35%, rgba(7,18,30,0.92) 60%, rgba(7,18,30,0.99) 100%)',
          }}
        />
      </>
    )}

    {/* Fallback when no image — solid dark + accent tint */}
    {!slide.image && (
      <div
        className="absolute inset-0"
        style={{
          background: isCenter
            ? `linear-gradient(145deg, ${slide.accent}20 0%, #07121E 50%)`
            : '#07121E',
        }}
      />
    )}

    {/* Content */}
    <div className="relative flex h-full flex-col p-7">
      {/* Step number + badge */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-black tracking-[0.25em] text-white/30">{slide.step}</span>
        <span
          className="rounded-full px-3 py-1 text-[11px] font-black backdrop-blur-sm"
          style={{ background: `${slide.accent}33`, color: slide.accent, border: `1px solid ${slide.accent}55` }}
        >
          {slide.badge}
        </span>
      </div>

      {/* Icon */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur-sm"
        style={{ background: `${slide.accent}25` }}
      >
        {slide.icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-[18px] font-black leading-tight text-white" style={{ letterSpacing: '-0.5px' }}>
        {slide.title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-[13px] leading-relaxed text-white/60">{slide.description}</p>

      {/* Items */}
      <ul className="flex flex-1 flex-col gap-2">
        {slide.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[12px] text-white/70">
            <span
              className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: slide.accent }}
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Note */}
      <div
        className="mt-5 rounded-xl px-3 py-2.5 text-[11px] font-semibold leading-relaxed backdrop-blur-sm"
        style={{ background: `${slide.accent}22`, color: slide.accent, border: `1px solid ${slide.accent}33` }}
      >
        → {slide.note}
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const FeatureCarousel = React.forwardRef<HTMLDivElement, FeatureCarouselProps>(
  ({ title, subtitle, slides, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(false);

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const handlePrev = React.useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    React.useEffect(() => {
      if (paused) return;
      const timer = setInterval(handleNext, 3500);
      return () => clearInterval(timer);
    }, [handleNext, paused]);

    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden', className)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        {...props}
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            className="font-black text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-2px', lineHeight: 1.08 }}
          >
            {title}
          </h2>
          <p className="mt-3 text-[15px] text-white/45">{subtitle}</p>
        </div>

        {/* Progress dots */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setPaused(true); }}
              className="transition-all duration-300"
              aria-label={`Étape ${i + 1}`}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentIndex ? 28 : 8,
                  height: 8,
                  background: i === currentIndex ? slide.accent : 'rgba(255,255,255,0.15)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Single card display — fade transition, no bleed-through */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-sm md:max-w-md">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="transition-all duration-500"
                style={{
                  display: index === currentIndex ? 'block' : 'none',
                }}
              >
                <SlideCard slide={slide} isCenter={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => { handlePrev(); setPaused(true); }}
            className="h-10 w-10 rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <span className="text-[13px] font-semibold text-white/40">
            {currentIndex + 1} / {slides.length}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => { handleNext(); setPaused(true); }}
            className="h-10 w-10 rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }
);

FeatureCarousel.displayName = 'FeatureCarousel';
