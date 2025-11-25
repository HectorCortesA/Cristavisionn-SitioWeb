import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img
            src="https://cristaleriabarcena.com/wp-content/uploads/2016/12/cristaleria-barcena-venta-y-colocacion-cristales-para-ventanas.jpg"
            alt="Slide 1"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://0201.nccdn.net/1_2/000/000/130/eb1/ventanas-para-casas-modernas.jpg"
            alt="Slide 2"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://vidsa.cr/wp-content/uploads/2021/10/ventanales-de-vidrio.jpg"
            alt="Slide 3"
          />
        </div>
      </div>
    </div>
  );
}
export default EmblaCarousel;
