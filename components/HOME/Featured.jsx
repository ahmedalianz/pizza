import { A11y, Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import styles from "styles/Featured.module.css";

export default function Featured() {
  const slides = [
    {
      image: "/images/featured1.webp",
      text: "<p>HOT AND SPICY</p><h1>PIZZA</h1><p>50% OFF</p>",
    },
    {
      image: "/images/featured2.webp",
      text: "<p>Special Offer</p><h1>BUY 2</h1><p>GET 1 FREE</p>",
    },
    {
      image: "/images/featured3.png",
      text: "<p>THE BEST</p><h1>PIZZA</h1><p>IS HERE</p>",
    },
  ];

  return (
    <Swiper
      className={styles.container}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Autoplay, A11y]}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i} className={styles.slideContainer}>
          <div className={styles.imgContainer}>
            <Image src={slide.image} alt="" layout="fill" objectFit="contain" />
          </div>
          <div
            className={styles.slideText}
            dangerouslySetInnerHTML={{ __html: slide.text }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
