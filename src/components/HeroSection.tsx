// import Link from "next/link";
// import React from "react";
//
// const HeroSection: React.FC = () => {
//
//
//   return (
//     <div>
//       {/* Banner Section */}
//       <section className="relative py-10 lg:py-0">
//         <div
//           className="absolute inset-0 hidden lg:block bg-[#f5faff] bg-[url('/image/banner-bg.png')] bg-no-repeat bg-auto bg-right bg-right-bottom-90"
//         ></div>
//         <div className="relative z-10 flex items-center lg:h-screen">
//           <div className="container mx-auto">
//             <div className="flex justify-start">
//               <div className="lg:w-7/12 md:w-10/12">
//                 <div className="text-dark space-y-6">
//                   <h4 className="text-lg font-medium text-[#055c2d]">Simple. Transparent. Secure</h4>
//                   <h1 className="text-4xl font-bold">Banking Solutions</h1>
//                   <p className="text-xl">
//                     Products and services designed to help you reach your financial goals.
//                   </p>
//                 </div>
//                 <div className="space-x-4 mt-6">
//                   <Link
//                     className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
//                     href="/userType"
//                   >
//                     Open Account
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
//
// export default HeroSection;


import React from "react";
import Link from "next/link";
import {CardIcon, InsurancesIcon, LoansIcon, RightArrowIcon} from "@/lib/icons";

const HeroSection: React.FC = () => {
  return (
      <div
          className="pt-[140px] md:pt-[160px] lg:pt-[190px] xl:pt-[220px] 2xl:pt-[295px] pb-[60px] md:pb-[80px] lg:pb-[40px] bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('https://angular.hibootstrap.com/tartu/assets/images/banners/banner-bg2.jpg')` }}
      >
        <div className="mx-auto px-[12px] container 2xl:px-[30px] 3xl:px-[120px]">
          <div className="lg:max-w-[550px] xl:max-w-[685px]">
          <span
              className="block uppercase font-medium text-[14px] md:text-[15px] lg:text-[16px] text-white mb-[7px] md:mb-[8px] lg:mb-[9px]"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="100"
          >
            Your Money, Your Way
          </span>
            <h1
                className="text-white font-bold text-[34px] md:text-[43px] lg:text-[50px] xl:text-[70px] font-serif leading-[1.1] mb-[12px] lg:mb-[15px] xl:mb-[17px]"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="200"
            >
              Elevate Your Banking Experience with Us
            </h1>
            <p
                className="text-white text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] leading-[1.7] mb-[15px] lg:max-w-[610px]"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="300"
            >
              Welcome to a new era of banking at Tartu, where traditional boundaries fade away and possibilities expand.
            </p>
            <a
                href="/tartu/about"
                className="mt-[2px] md:mt-[5px] lg:mt-[10px] xl:mt-[20px] py-[11px] md:py-[12px] lg:py-[13px] px-[30px] md:px-[40px] inline-block text-white text-[13px] md:text-[14px] font-medium uppercase border border-[#0a64bc] bg-[#0a64bc] rounded-full transition-all hover:bg-white hover:text-[#0a64bc]"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="400"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Cards Section */}
        <div className="container mx-auto px-[12px] 2xl:px-0 mt-[60px] md:mt-[80px] lg:mt-[100px] xl:mt-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
            {/* Card Component */}
            <div
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="box rounded-[20px] p-[20px] sm:p-[30px] xl:p-[40px] hero-card"
            >
              <div className="flex mb-[15px] md:mb-[20px] xl:mb-[25px]">
                <div className="icon w-[56px] h-[56px] rounded-full flex items-center justify-center bg-[#00000070]">
                  <CardIcon/>
                </div>
                <h3 className="font-serif font-bold text-white text-[18px] md:text-[20px] lg:text-[22px] self-center ml-[15px] md:ml-[18px]">
                  <Link className="text-white inline-block" href="#">
                    Cards
                  </Link>
                </h3>
              </div>
              <p className="text-[14px] md:text-[15px] text-white leading-[1.7]">
                {`We understand that your spending needs are as unique as you are. That's why our card services are
                  crafted to offer unmatched flexibility.`}
              </p>
              <a
                  className="inline-block uppercase text-[13px] md:text-[14px] font-medium text-white mt-[16px] md:mt-[18px] lg:mt-[20px] xl:mt-[25px] relative pr-[30px] transition-all hover:pr-[40px]"
                  href="#"
              >
                Learn More
                <RightArrowIcon/>
              </a>
            </div>
            <div
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="box rounded-[20px] p-[20px] sm:p-[30px] xl:p-[40px] hero-card"
            >
              <div className="flex mb-[15px] md:mb-[20px] xl:mb-[25px]">
                <div className="icon w-[56px] h-[56px] rounded-full flex items-center justify-center bg-[#00000070]">
                  <LoansIcon/>
                </div>
                <h3 className="font-serif font-bold text-white text-[18px] md:text-[20px] lg:text-[22px] self-center ml-[15px] md:ml-[18px]">
                  <Link className="text-white inline-block" href="#">
                    Loans
                  </Link>
                </h3>
              </div>
              <p className="text-[14px] md:text-[15px] text-white leading-[1.7]">
                {`We understand that your spending needs are as unique as you are. That's why our card services are crafted to offer unmatched flexibility`}
              </p>
              <a
                  className="inline-block uppercase text-[13px] md:text-[14px] font-medium text-white mt-[16px] md:mt-[18px] lg:mt-[20px] xl:mt-[25px] relative pr-[30px] transition-all hover:pr-[40px]"
                  href="#"
              >
                Learn More
                <RightArrowIcon/>
              </a>
            </div>
            <div
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="box rounded-[20px] p-[20px] sm:p-[30px] xl:p-[40px] hero-card"
            >
              <div className="flex mb-[15px] md:mb-[20px] xl:mb-[25px]">
                <div className="icon w-[56px] h-[56px] rounded-full flex items-center justify-center bg-[#00000070]">
                  <InsurancesIcon/>
                </div>
                <h3 className="font-serif font-bold text-white text-[18px] md:text-[20px] lg:text-[22px] self-center ml-[15px] md:ml-[18px]">
                  <Link className="text-white inline-block" href="#">
                    Insurances
                  </Link>
                </h3>
              </div>
              <p className="text-[14px] md:text-[15px] text-white leading-[1.7]">
                {`We understand that your spending needs are as unique as you are. That's why our card services are crafted to offer unmatched flexibility`}
              </p>
              <a
                  className="inline-block uppercase text-[13px] md:text-[14px] font-medium text-white mt-[16px] md:mt-[18px] lg:mt-[20px] xl:mt-[25px] relative pr-[30px] transition-all hover:pr-[40px]"
                  href="#"
              >
                Learn More
                <RightArrowIcon/>
              </a>
            </div>
            {/* Add more cards here */}
          </div>
        </div>
      </div>
  );
};


export default HeroSection;
