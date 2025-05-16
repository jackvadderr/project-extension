"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useDotButton, DotButton } from './EmblaCarouselDotButton'
import './embla.css'

const images = ['/new-slide/slide-4.jpg', '/new-slide/slide-6.jpg']

const EmblaCarousel: React.FC = () => {
  const options: EmblaOptionsType = {
    loop: true,
    duration: 30
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
    onNavButtonClick(emblaApi!)
  }, [emblaApi, onNavButtonClick])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
    onNavButtonClick(emblaApi!)
  }, [emblaApi, onNavButtonClick])

  return (
    <section className="embla relative h-screen w-full overflow-hidden">
      <div className="embla__viewport h-full w-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {images.map((src, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] min-w-0 h-full relative flex items-center justify-center"
            >
              <div
                className="w-full h-full bg-black"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0.8)',
                  transition: 'filter 0.5s ease'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <button
        onClick={scrollPrev}
        className="embla__prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="embla__next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
        aria-label="Próximo slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de posição (dots) */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? 'bg-white w-6 opacity-100'
                : 'bg-white/50 opacity-70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default EmblaCarousel