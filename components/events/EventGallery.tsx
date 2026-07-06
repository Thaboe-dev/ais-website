"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

const easeOut = [0.16, 1, 0.3, 1] as const;

export type GalleryImage = {
  src: string;
  alt?: string;
};

export function EventGallery({
  images,
  title = "Event gallery",
}: {
  images: (GalleryImage | string)[];
  title?: string;
}) {
  const normalized: GalleryImage[] = images.map((it) =>
    typeof it === "string" ? { src: it, alt: "" } : it,
  );
  const [active, setActive] = useState<number | null>(null);
  const count = normalized.length;

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % count)),
    [count],
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + count) % count)),
    [count],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  if (count === 0) return null;

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Badge tone="crimson">
          <ImageIcon className="h-3 w-3" /> Gallery
        </Badge>
        <span className="text-xs text-charcoal-500">{count} photos</span>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        aria-label={title}
      >
        {normalized.map((img, i) => (
          <motion.button
            key={i}
            type="button"
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.98 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.45, ease: easeOut },
              },
            }}
            whileHover={{ y: -2 }}
            onClick={() => setActive(i)}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-charcoal-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 focus-visible:ring-offset-2",
              // Featured first tile takes extra space on desktop for visual rhythm
              i === 0 && "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
              i !== 0 && "aspect-[4/3]",
            )}
            aria-label={img.alt || `View image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(img.src)}
              alt={img.alt || ""}
              loading={i < 3 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              draggable={false}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <div
              aria-hidden
              className="absolute right-2 top-2 h-8 w-8 rounded-full inline-flex items-center justify-center bg-white/85 text-charcoal-900 shadow-[var(--shadow-soft)] opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ZoomIn className="h-4 w-4" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="gallery-lightbox"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-charcoal-950/90 backdrop-blur-sm"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full inline-flex items-center justify-center bg-white/85 text-charcoal-900 hover:bg-white transition-colors backdrop-blur"
            >
              <X className="h-5 w-5" />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 z-10 h-11 w-11 rounded-full inline-flex items-center justify-center bg-white/85 text-charcoal-900 hover:bg-white transition-colors backdrop-blur"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 z-10 h-11 w-11 rounded-full inline-flex items-center justify-center bg-white/85 text-charcoal-900 hover:bg-white transition-colors backdrop-blur"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative max-w-6xl w-full max-h-[calc(100vh-6rem)] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 4 }}
                transition={{ duration: 0.3, ease: easeOut }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(normalized[active].src)}
                  alt={normalized[active].alt || ""}
                  className="max-h-[calc(100vh-6rem)] max-w-full w-auto h-auto rounded-2xl object-contain shadow-[var(--shadow-strong)]"
                  draggable={false}
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/70">
                  {active + 1} / {count}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
