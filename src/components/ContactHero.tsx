import Link from "next/link";
import React from "react";

const ContactHero: React.FC = () => {
 

  return (
    <div>
      {/* Banner Section */}
      <section className="relative">
        <div
          className="absolute inset-0 hidden lg:block bg-[#f5faff] bg-[url('/image/contact-banner.png')] bg-no-repeat bg-auto bg-right bg-right-bottom-90"
        ></div>
        <div className="relative z-10 flex items-center h-screen">
          <div className="container mx-auto">
            <div className="flex justify-start">
              <div className="lg:w-7/12 md:w-10/12">
                <div className="text-dark space-y-6">
                  <h1 className="md:text-2xl text-xl lg:text-8xl font-bold">Contact Us</h1>
                  <p className="text-lg lg:text-xl">
                    Reach out to our team for personalized assistance with your banking needs.
                  </p>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactHero;
