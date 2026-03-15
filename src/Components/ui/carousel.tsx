import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import foto12 from "../../assets/Proyect/13.webp";
import foto13 from "../../assets/Proyect/31.webp";
import foto14 from "../../assets/Proyect/4.webp";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img src={foto12} alt="Slide 1" />
        </div>
        <div className="embla__slide">
          <img src={foto13} alt="Slide 2" />
        </div>
        <div className="embla__slide">
          <img src={foto14} alt="Slide 3" />
        </div>
      </div>
    </div>
  );
}
export default EmblaCarousel;
