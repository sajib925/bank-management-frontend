import React from 'react';

const AboutHeroSection = () => {
    return (
        <div className="pt-[60px] md:pt-[80px] pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[120px]">
            <div className="container mx-auto px-[12px] 2xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[25px]">
                    <div className="self-center">
            <span
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="block uppercase font-medium text-[14px] md:text-[15px] lg:text-[16px] text-[#0a64bc] mb-[7px] md:mb-[8px] lg:mb-[10px] xl:mb-[12px]"
            >
              About Us
            </span>
                        <h2
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="200"
                            className="text-black font-bold font-serif text-[28px] md:text-[34px] lg:text-[38px] xl:text-[42px] leading-[1.2]"
                        >
                            Discover Tartu Journey and Commitment to Delivering Innovative, Secure, and Customer-Centric Digital Banking Solutions
                        </h2>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="100"
                        className="self-center xl:ml-[80px] 2xl:ml-[130px] relative z-[1] md:pl-[10px] before:left-0 before:top-0 before:bottom-0 before:right-0 before:bg-[#b31942] before:absolute before:-z-[1] before:rounded-[20px] before:hidden md:before:block"
                    >
                        <img
                            src="https://angular.hibootstrap.com/tartu/assets/images/about.jpg"
                            alt="about-image"
                            className="rounded-[20px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHeroSection;
