import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className="pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[120px]">
            <div className="container mx-auto px-[12px] 2xl:px-0">
                <div className="bg-[#0a64bc] rounded-[20px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] md:gap-[35px] lg:gap-0">
                        <div className="self-center lg:mr-[90px] xl:mr-[104px] relative z-[1] md:pr-[20px] before:left-0 before:top-0 before:bottom-0 before:right-0 before:bg-[#b31942] before:absolute before:-z-[1] before:rounded-[20px] before:hidden md:before:block">
                            <img
                                src="https://angular.hibootstrap.com/tartu/assets/images/why-choose-us.jpg"
                                alt="why-choose-us-image"
                                className="rounded-[20px]"
                            />
                        </div>
                        <div className="self-center lg:-ml-[60px] 2xl:-ml-[35px] pl-[15px] sm:pl-[25px] md:pl-[35px] lg:pl-0 pb-[30px] md:pb-[35px] lg:pb-0 pr-[15px] sm:pr-[25px] md:pr-[35px] lg:pr-[30px] xl:pr-[50px] 2xl:pr-[70px] lg:mt-[50px] lg:mb-[50px] xl:mt-0 xl:mb-0">
              <span className="block uppercase font-medium text-[14px] md:text-[15px] lg:text-[16px] text-white mb-[7px] md:mb-[8px] lg:mb-[10px]">
                Why Choose Tartu
              </span>
                            <h2 className="text-white font-bold font-serif text-[28px] md:text-[34px] lg:text-[38px] xl:text-[42px] leading-[1.2] mb-[25px] md:mb-[35px] 2xl:mb-[40px] xl:max-w-[575px]">
                                Choose Us for a Future-Ready Banking Experience
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px] md:gap-[20px] 2xl:gap-[40px]">
                                {[
                                    {
                                        title: '24/7 Accessibility',
                                        description:
                                            'Unlike traditional banks with limited operating hours, digital banking offers round-the-clock access.',
                                    },
                                    {
                                        title: 'User-Friendly Interfaces',
                                        description:
                                            'Digital banking platforms typically feature intuitive and user-friendly interfaces.',
                                    },
                                    {
                                        title: 'Cost Savings',
                                        description:
                                            'Digital banks often have lower operational costs than brick-and-mortar banks, allowing for competitive fees.',
                                    },
                                    {
                                        title: 'Speedy Transactions',
                                        description:
                                            'Digital banking processes transactions faster than traditional methods, making it ideal for urgent needs.',
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative pl-[32px] md:pl-[35px]"
                                    >
                                        <div className="absolute left-0 top-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z"
                                                    fill="white"
                                                ></path>
                                            </svg>
                                        </div>
                                        <h3 className="font-bold font-serif text-[18px] text-white leading-[1] mb-[12px] md:mb-[14px]">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] md:text-[15px] text-[#f9f9f9] leading-[1.7]">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <a
                                href="/tartu/about"
                                className="mt-[22px] md:mt-[27px] lg:mt-[25px] 2xl:mt-[35px] py-[11px] md:py-[12px] px-[30px] md:px-[40px] inline-block text-white text-[13px] md:text-[14px] font-medium uppercase border rounded-full transition-all hover:bg-white hover:text-[#0a64bc]"
                            >
                                More About Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
