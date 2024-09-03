import Image from "next/image";
import React from "react";
import { AiFillBell } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

const FeaturesSection2 = () => {
  return (
    <section className="py-16 lg:py-28">
      <div className="overlay ">
        <div className="container mx-auto animate-fadeInUp">
          <div className="flex flex-wrap gap-6 lg:gap-0">
            <div className="w-full lg:w-1/2 flex justify-between">
              <div className="img-area">
                <Image
                  alt="image"
                  src={"/image/feature-item-2.webp"}
                  width={540}
                  height={540}
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="top-section">
                <span className="w-[60px] h-[60px] rounded-full bg-[#1a4dbe] lg:mb-7 flex justify-center items-center mb-4">
                  <AiFillBell className="text-white h-6 w-5" />
                </span>
                <h5 className="subTitle">
                  Safe Investments
                </h5>
                <h2 className="title">
                  The Better Way to Save & Invest
                </h2>
                <p className="mt-4 text-[18px] text-gray-700">
                  {` Bankio helps over 2 million customers achieve their financial goals by helping them save and invest with ease. Put that extra cash to use without putting it at risk with Bankio.`}
                </p>
                <ul className="list mt-5">
                  <li className="flex items-center gap-2 mb-4">
                    <span className="min-w-6 h-6 rounded-full bg-[#055c2d] flex items-center justify-center">
                      <IoMdCheckmark className="text-white" />
                    </span>
                    <span className="text-[18px] font-medium">
                      Profitable to invest and Handy to manage
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="min-w-6 h-6 rounded-full bg-[#055c2d] flex items-center justify-center">
                      <IoMdCheckmark className="text-white" />
                    </span>
                    <span className="text-[18px] font-medium">
                      Highest Returns on your investments
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection2;
