import Image from "next/image";
import React from "react";
import { AiFillBell } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

const FeaturesSection2 = () => {
  return (
    <section className="features-section">
      <div className="overlay pt-28">
        <div className="container mx-auto animate-fadeInUp">
          <div className="flex flex-wrap">
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
                <h5 className="font-semibold text-[#055c2d] text-xl mb-8">
                  Safe Investments
                </h5>
                <h2 className="text-6xl font-bold mb-4">
                  The Better Way to Save & Invest
                </h2>
                <p className="mt-4 text-[18px] text-gray-700">
                  {` Bankio helps over 2 million customers achieve their financial goals by helping them save and invest with ease. Put that extra cash to use without putting it at risk with Bankio.`}
                </p>
                <ul className="list mt-5">
                  <li className="flex items-center mb-4">
                    <span className="w-6 h-6 rounded-full bg-[#055c2d] flex items-center justify-center mr-2">
                      <IoMdCheckmark className="text-white" />
                    </span>
                    <span className="text-[18px] font-medium flex items-center justify-center mr-2">
                      Profitable to invest and Handy to manage
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-[#055c2d] flex items-center justify-center mr-2">
                      <IoMdCheckmark className="text-white" />
                    </span>
                    <span className="text-[18px] font-medium flex items-center justify-center mr-2">
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
