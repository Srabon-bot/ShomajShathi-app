import Image from "next/image";
import { gallery } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * A contact sheet, not a mosaic: every tile is the same square. Caption below,
 * never over the photograph. Static, no lightbox.
 */
export function GalleryGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 md:grid-cols-4", className)}>
      {gallery.map((item, index) => (
        <figure key={item.src + index}>
          <div className="relative aspect-square overflow-hidden bg-foreground/8">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <figcaption className="t-label mt-2 text-muted">{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
