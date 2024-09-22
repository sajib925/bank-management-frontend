"use client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/parallax";

// Define the structure of the slides
interface Slide {
    title: string;
    subtitle: string;
    text: string;
    image: string;
}

const slidesData: Slide[] = [
    {
        title: "Slide 1 Title",
        subtitle: "Slide 1 Subtitle",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/image/banner-bg.png",
    },
    {
        title: "Slide 2 Title",
        subtitle: "Slide 2 Subtitle",
        text: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
        image: "/image/banner-bg.png",
    },
    {
        title: "Slide 3 Title",
        subtitle: "Slide 3 Subtitle",
        text: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
        image: "/image/banner-bg.png",
    },
];

const BannerSlider: FC = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Swiper
                modules={[Pagination, Parallax, Autoplay]}
                pagination={{ clickable: true }}
                parallax={true}
                autoplay={{ delay: 4000 }}
                loop={true}
                speed={600} // Set speed of slide transition for parallax smoothness
            >
                {/* Parallax Background */}
                <div
                    slot="container-start"
                    className="absolute top-0 left-0 w-full h-full"
                    data-swiper-parallax="-23%"
                    style={{
                        backgroundImage: `url('/image/banner-bg.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>

                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 md:px-12">
                            {/* Slide title with parallax */}
                            <h1
                                className="text-white text-4xl md:text-6xl font-bold"
                                data-swiper-parallax="-100"
                            >
                                {slide.title}
                            </h1>
                            {/* Slide subtitle with parallax */}
                            <h2
                                className="text-white text-2xl md:text-4xl"
                                data-swiper-parallax="-200"
                            >
                                {slide.subtitle}
                            </h2>
                            {/* Slide text with parallax */}
                            <div
                                className="text-whtie mt-4 text-base md:text-lg max-w-xl"
                                data-swiper-parallax="-300"
                                data-swiper-parallax-duration="600"
                            >
                                <p>{slide.text}</p>
                            </div>
                            {/* Slide-specific image in background */}
                            <div
                                className="absolute top-0 left-0 w-full h-full"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                data-swiper-parallax="-23%"
                            ></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
