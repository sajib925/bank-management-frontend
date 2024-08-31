import Image from "next/image";
import React from "react";
import { AiFillBell } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="overlay pt-28">
        <div className="container mx-auto animate-fadeInUp">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <div className="top-section">
                <span className="w-[60px] h-[60px] rounded-full bg-[#1a4dbe] lg:mb-7 flex justify-center items-center mb-4">
                  <AiFillBell className="text-white h-6 w-5" />
                </span>
                <h5 className="font-semibold text-[#055c2d] text-xl mb-8">Smart Banking</h5>
                <h2 className="text-6xl font-bold mb-4">
                  Real-time Notifications
                </h2>
                <p className="mt-4 text-[18px] text-gray-700">
                 {` Your customer stays informed in real time with everything
                  that’s happening on their account: payments, transfers,
                  advice. Get visibility on your customers' flows to anticipate
                  their needs.`}
                </p>
                <ul className="list mt-5">
                  <li className="flex items-center mb-4">
                    <span className="w-6 h-6 rounded-full bg-[#055c2d] flex items-center justify-center mr-2">
                      <IoMdCheckmark className="text-white" />
                    </span>
                    <span className="text-[18px] font-medium flex items-center justify-center mr-2">Cards that work all across the world.</span>
                  </li>
                  <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#055c2d] flex items-center justify-center mr-2">
                      <IoMdCheckmark className="text-white" />
                    </span>
                    <span className="text-[18px] font-medium flex items-center justify-center mr-2">No ATM fees. No minimum balance. No overdrafts.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-end">
              <div className="img-area">
                <Image
                  alt="image"
                  src={"/image/feature-item-1.webp"}
                  width={540}
                  height={540}
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
