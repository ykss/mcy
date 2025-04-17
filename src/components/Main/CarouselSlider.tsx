import { useRef, useState, useCallback, useEffect } from "react"
import CarouselSliderProps from "../../types/CarouselSlider"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const CarouselSlider = ({ imageArray }: CarouselSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
      startIndex: 0,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  )
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-[387px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {imageArray.map((content, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative">
                <img src={content.img} alt={`슬라이더 ${index + 1}`} className="w-[387px] h-[210px] rounded-[20px]" />
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {imageArray.map((_, idx) => (
                    <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${idx === selectedIndex ? "bg-black" : "bg-white"}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarouselSlider
