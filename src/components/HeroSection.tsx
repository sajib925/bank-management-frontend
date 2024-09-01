import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
 

  return (
    <div>
      {/* Banner Section */}
      <section className="relative py-10 lg:py-0">
        <div
          className="absolute inset-0 hidden lg:block bg-[#f5faff] bg-[url('/image/banner-bg.png')] bg-no-repeat bg-auto bg-right bg-right-bottom-90"
        ></div>
        <div className="relative z-10 flex items-center lg:h-screen">
          <div className="container mx-auto">
            <div className="flex justify-start">
              <div className="lg:w-7/12 md:w-10/12">
                <div className="text-dark space-y-6">
                  <h4 className="text-lg font-medium text-[#055c2d]">Simple. Transparent. Secure</h4>
                  <h1 className="text-4xl font-bold">Banking Solutions</h1>
                  <p className="text-xl">
                    Products and services designed to help you reach your financial goals.
                  </p>
                </div>
                <div className="space-x-4 mt-6">
                  <Link
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
                    href="/userType"
                  >
                    Open Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
