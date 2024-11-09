import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../assets/styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   progressCircle.current.style.setProperty("--progress", 1 - progress);
  //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  // };
  return (
    <div className="">
      <div className="  ">
        <Swiper 
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          
          modules={[Autoplay, Pagination, Navigation]}
          // onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className=" relative h-[300px] md:h-[400px] lg:h-[600px] w-full">
              <img src={slide1} alt="" />
              <div className="w-full h-full swiper-slide-content bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] absolute lg:gap-4 inset-0 text-white flex flex-col justify-center items-start px-10">
                
                <p className=" text-white text-left text-lg md:text-2xl lg:text-5xl lg:w-[800px]">
                Become a Valued Member of ReturnTrack Today
                </p>
                <Link to='/join-employ' className="flex gap-1 items-center mt-2 w-40  lg:w-48 font-semibold btn btn-outline btn-accent">
                  Join as employer
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-[300px] md:h-[400px] lg:h-[600px] w-full">
              <img src={slide2} alt="" />
              <div className="w-full h-full swiper-slide-content bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)] absolute lg:gap-4 inset-0 text-white flex flex-col justify-center items-start px-10">
                
                <p className=" text-white text-left text-lg md:text-2xl lg:text-5xl lg:w-[800px]">
                Lead, Inspire, and Shape the Future with ReturnTrack.
                </p>
                <Link to='/join-employ' className="flex gap-1 items-center mt-2 w-40  lg:w-48 font-semibold btn btn-outline btn-accent">
                  Join as Manager
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
