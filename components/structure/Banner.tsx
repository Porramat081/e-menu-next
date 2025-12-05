import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const mock_carousel_png = [1, 2, 3, 4, 5];

export default function Banner() {
  return (
    <div className="p-4 rounded-2xl">
      <Swiper
        className="rounded-2xl overflow-clip "
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={600}
        slidesPerView={1}
        pagination={{ clickable: true }}
        allowTouchMove={true}
        grabCursor={true}
      >
        {mock_carousel_png.map((item, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full aspect-video max-h-[168px]"
          >
            <Image
              src={`/pic/c${item}.png`}
              alt={"pic" + index}
              fill
              className="object-fill object-center origin-center"
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
