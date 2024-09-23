import React from 'react';

const FunFacts = () => {
    return (
        <div className="pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[120px]">
            <div className="container mx-auto px-[12px] 2xl:px-0">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-[25px]">
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="100"
                        className="md:flex lg:block xl:flex"
                    >
                        <div className="self-center font-serif leading-none font-semibold text-[40px] md:text-[45px] lg:text-[52px] xl:text-[43px] 2xl:text-[52px] text-[#b31942]">
                            15 M <span className="font-normal text-[30px] md:text-[34px] relative -top-[10px] md:-top-[12px] lg:-top-[15px]">+</span>
                        </div>
                        <div className="self-center mt-[10px] md:mt-0 md:ml-[17px] lg:mt-[10px] xl:mt-0 lg:ml-0 xl:ml-[12px] 2xl:ml-[17px]">
                            <span className="block md:max-w-[121px] text-[#4c4c4c] text-14px md:text-[15px] lg:text-[16px]">Satisfied Global Customers</span>
                        </div>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="200"
                        className="md:flex lg:block xl:flex"
                    >
                        <div className="self-center font-serif leading-none font-semibold text-[40px] md:text-[45px] lg:text-[52px] xl:text-[43px] 2xl:text-[52px] text-[#b31942]">
                            7450 <span className="font-normal text-[30px] md:text-[34px] relative -top-[10px] md:-top-[12px] lg:-top-[15px]">+</span>
                        </div>
                        <div className="self-center mt-[10px] md:mt-0 md:ml-[17px] lg:mt-[10px] xl:mt-0 lg:ml-0 xl:ml-[12px] 2xl:ml-[17px]">
                            <span className="block md:max-w-[121px] text-[#4c4c4c] text-14px md:text-[15px] lg:text-[16px]">Experts Team Members</span>
                        </div>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="300"
                        className="md:flex lg:block xl:flex"
                    >
                        <div className="self-center font-serif leading-none font-semibold text-[40px] md:text-[45px] lg:text-[52px] xl:text-[43px] 2xl:text-[52px] text-[#b31942]">
                            10 M <span className="font-normal text-[30px] md:text-[34px] relative -top-[10px] md:-top-[12px] lg:-top-[15px]">+</span>
                        </div>
                        <div className="self-center mt-[10px] md:mt-0 md:ml-[17px] lg:mt-[10px] xl:mt-0 lg:ml-0 xl:ml-[12px] 2xl:ml-[17px]">
                            <span className="block md:max-w-[121px] text-[#4c4c4c] text-14px md:text-[15px] lg:text-[16px]">Credit &amp; Debit Cards Approved</span>
                        </div>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="400"
                        className="md:flex lg:block xl:flex"
                    >
                        <div className="self-center font-serif leading-none font-semibold text-[40px] md:text-[45px] lg:text-[52px] xl:text-[43px] 2xl:text-[52px] text-[#b31942]">
                            1780 <span className="font-normal text-[30px] md:text-[34px] relative -top-[10px] md:-top-[12px] lg:-top-[15px]">+</span>
                        </div>
                        <div className="self-center mt-[10px] md:mt-0 md:ml-[17px] lg:mt-[10px] xl:mt-0 lg:ml-0 xl:ml-[12px] 2xl:ml-[17px]">
                            <span className="block md:max-w-[121px] text-[#4c4c4c] text-14px md:text-[15px] lg:text-[16px]">Branches Worldwide</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunFacts;
