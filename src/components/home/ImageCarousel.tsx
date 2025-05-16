'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const images = ['/event1.jpg', '/event2.jpg', '/event3.jpg'];

export default function ImageCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="absolute inset-0 z-0" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((src, idx) => (
          <div key={idx} className="min-w-full h-full relative">
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              layout="fill"
              objectFit="cover"
              className="brightness-50"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
