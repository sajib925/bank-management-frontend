import React from 'react';
import Link from "next/link";

const WhyChooseStyleTwo = () => {
    return (
        <div className="py-[60px] md:py-[80px] lg:py-[100px] xl:py-[120px] bg-[#0a64bc]">
            <div className="container mx-auto px-[12px] 2xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[25px]">
                    <div>
            <span
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="block uppercase font-medium text-[14px] md:text-[15px] lg:text-[16px] text-white mb-[7px] md:mb-[8px] lg:mb-[10px]"
            >
              Why Choose Tartu
            </span>
                        <h2
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="200"
                            className="text-white font-bold font-serif text-[28px] md:text-[34px] lg:text-[38px] xl:text-[42px] leading-[1.2] mb-[20px] md:mb-[25px] lg:mb-[78px] xl:max-w-[575px]"
                        >
                            Choose Us for a Future-Ready Banking Experience
                        </h2>
                        <Link
                            href="/about"
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="300"
                            className="py-[11px] md:py-[12px] px-[30px] md:px-[40px] inline-block text-white text-[13px] md:text-[14px] font-medium uppercase border rounded-full transition-all hover:bg-white hover:text-[#0a64bc]"
                        >
                            More About Us
                        </Link>
                    </div>

                    <div className="md:mt-[10px] lg:mt-0 xl:mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-[22px] md:gap-[25px] md:gap-[20px] 2xl:gap-[35px]">
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
                                    'Digital banks often have lower operational costs than brick-and-mortar banks.',
                            },
                            {
                                title: 'Speedy Transactions',
                                description:
                                    'Digital banking processes transactions faster than traditional methods, making it ideal for urgent needs.',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay={(index + 1) * 100}
                                className="relative pl-[32px] md:pl-[35px]"
                            >
                                <div className="absolute left-0 -top-[4px]">
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
                                        />
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
                </div>

                <div className="border-t mt-[60px] pt-[60px] md:mt-[80px] md:pt-[80px] lg:mt-[100px] lg:pt-[100px]"></div>

                <div className="grid grid-cols-1 lg:grid-cols-3 self-center">
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="100"
                        className="self-center"
                    >
            <span className="block text-[16px] md:text-[18px] lg:text-[20px] font-medium text-white font-serif mb-[30px] md:mb-[40px] lg:mb-0 lg:max-w-[280px]">
              Increase your brand’s revenue with Tartu
            </span>
                    </div>

                    <div className="self-center lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[25px]">
                        {[
                            'https://angular.hibootstrap.com/tartu/assets/images/brands/brand7.png',
                            'https://angular.hibootstrap.com/tartu/assets/images/brands/brand8.png',
                            'https://angular.hibootstrap.com/tartu/assets/images/brands/brand9.png',
                            'https://angular.hibootstrap.com/tartu/assets/images/brands/brand10.png',
                        ].map((src, index) => (
                            <div key={index} className="self-center text-center">
                                <img src={src} alt={`brand-image-${index + 1}`} className="inline" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseStyleTwo;
