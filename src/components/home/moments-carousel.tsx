"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { apiFetchEnvelope } from "@/lib/api";
import type { EventItem } from "@/lib/events";
import { formatDateParts } from "@/lib/events";

const BASE = "https://shomajshathi-app.vercel.app/images";

/** Static fallback images shown when the API has no past events. */
const FALLBACK = [
  { src: `${BASE}/${encodeURIComponent("Blankets for Mohammadpur Basti (past).jpg")}`, caption: "Blankets collected and sorted for families.", detail: null, href: null },
  { src: `${BASE}/${encodeURIComponent("Hatirjheel Tree Plantation upcoming.jpg")}`, caption: "Saplings planted along the embankment.", detail: null, href: null },
  { src: `${BASE}/${encodeURIComponent("Buriganga Bank Cleanup (past).jpg")}`, caption: "A riverbank restored by volunteers.", detail: null, href: null },
  { src: `${BASE}/${encodeURIComponent("street children in bangladesh education circle.jpg")}`, caption: "Books opened, letters learned.", detail: null, href: null },
];

type Slide = { src: string; caption: string; detail: string | null; href: string | null };

function eventToSlide(event: EventItem): Slide {
  const date = formatDateParts(event.date);
  return {
    src: event.image,
    caption: event.title,
    detail: `${date.full} · ${event.location} · ${event.attendeeCount} attended`,
    href: `/events/${event.id}`,
  };
}

/** Caption panel shown alongside each slide. Reads selected index from Embla. */
function SlideCaption({ slides }: { slides: Slide[] }) {
  const { api } = useCarousel();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => { api.off("select", onSelect); api.off("reInit", onSelect); };
  }, [api]);

  const slide = slides[index];
  const total = slides.length;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div className="flex flex-col justify-between bg-hero p-5 sm:p-7 md:p-10 text-hero-foreground dark:bg-[#29291D] dark:text-[#EAE4D5]">
      <div>
        <p className="t-label text-brand">{counter}</p>
        <p className="t-h3 mt-3 sm:mt-4 carousel-slide text-white dark:text-[#EAE4D5] text-base sm:text-lg md:text-xl font-bold">{slide?.caption}</p>
        {slide?.detail && (
          <p className="t-small mt-2 sm:mt-3 text-hero-muted carousel-slide dark:text-[#EAE4D5]/70 text-xs sm:text-sm">{slide.detail}</p>
        )}
      </div>
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        {slide?.href ? (
          <Link href={slide.href} className="t-label text-xs text-hero-muted hover:text-hero-foreground dark:text-[#EAE4D5]/80 dark:hover:text-[#EAE4D5]">
            Read what happened →
          </Link>
        ) : (
          <Link href="/events/past" className="t-label text-xs text-hero-muted hover:text-hero-foreground dark:text-[#EAE4D5]/80 dark:hover:text-[#EAE4D5]">
            See the archive →
          </Link>
        )}
      </div>
    </div>
  );
}

export function GalleryCarousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loaded, setLoaded] = useState(false);
  const autoplayRef = useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  useEffect(() => {
    let active = true;
    apiFetchEnvelope<EventItem[]>("/api/events?scope=past&limit=8&sort=-date")
      .then(({ data }) => {
        if (!active) return;
        setSlides(data.length ? data.map(eventToSlide) : FALLBACK);
        setLoaded(true);
      })
      .catch(() => {
        if (!active) return;
        setSlides(FALLBACK);
        setLoaded(true);
      });
    return () => { active = false; };
  }, []);

  if (!loaded) {
    return (
      <div
        className="aspect-[4/3] w-full skeleton md:aspect-[16/9]"
        aria-label="Loading gallery"
        aria-busy="true"
      />
    );
  }

  return (
    <Carousel
      plugins={[autoplayRef.current]}
      opts={{ loop: true }}
      className="border border-rule bg-hero dark:bg-[#29291D]"
    >
      <div className="flex flex-col md:grid md:grid-cols-2">
        {/* Slides */}
        <CarouselContent className="-ml-0">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="pl-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Slides may be user-submitted event images (any domain) or
                    Unsplash fallbacks. Use unoptimized to allow both. */}
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Caption + controls */}
        <SlideCaption slides={slides} />
      </div>
    </Carousel>
  );
}
