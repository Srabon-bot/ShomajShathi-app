"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => { api.off("reInit", onSelect); api.off("select", onSelect); };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider value={{ carouselRef, api, opts, orientation, scrollPrev: () => api?.scrollPrev(), scrollNext: () => api?.scrollNext(), canScrollPrev, canScrollNext }}>
      <div
        aria-roledescription="carousel"
        className={cn("relative", className)}
        role="region"
        onKeyDownCapture={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); api?.scrollPrev(); }
          if (e.key === "ArrowRight") { e.preventDefault(); api?.scrollNext(); }
        }}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-roledescription="slide"
      role="group"
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      {...props}
    />
  );
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<"button">) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      aria-label="Previous slide"
      className={cn("inline-flex size-11 items-center justify-center border border-hero-foreground/30 text-hero-foreground hover:border-hero-foreground hover:bg-hero-foreground hover:text-hero disabled:opacity-30", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      type="button"
      {...props}
    >
      <ArrowLeft size={18} />
    </button>
  );
}

function CarouselNext({ className, ...props }: React.ComponentProps<"button">) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      aria-label="Next slide"
      className={cn("inline-flex size-11 items-center justify-center border border-hero-foreground/30 text-hero-foreground hover:border-hero-foreground hover:bg-hero-foreground hover:text-hero disabled:opacity-30", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      type="button"
      {...props}
    >
      <ArrowRight size={18} />
    </button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel };
