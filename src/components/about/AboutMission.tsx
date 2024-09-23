import React from 'react';
import Link from "next/link";

const MissionVision = () => {
    return (
        <div className="py-16 md:py-20 lg:py-24 xl:py-30">
            <div className="container mx-auto px-3 2xl:px-0">
                <div className="mb-8 md:mb-10 lg:mb-12 text-center">
          <span className="block uppercase font-medium text-sm md:text-base lg:text-lg text-blue-600 mb-2 md:mb-3 lg:mb-4" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">
            Mission & Vision
          </span>
                    <h2 className="text-black font-bold font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl mx-auto lg:max-w-2xl leading-tight" data-aos="fade-up" data-aos-duration="500" data-aos-delay="200">
                        World’s Leading Digital Bank. Your Trust, Our Technology.
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="self-center" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">
                        <img src="https://angular.hibootstrap.com/tartu/assets/images/mission-vision/mv2.jpg" alt="mission-vision" className="rounded-2xl" />
                    </div>
                    <div className="self-center xl:pl-2 2xl:pl-15">
                        <h3 className="text-black font-bold text-lg md:text-xl lg:text-2xl mb-2 lg:mb-3"
                            data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">
                            Our Mission
                        </h3>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4" data-aos="fade-up"
                           data-aos-duration="500" data-aos-delay="200">
                            We stand for transparency, accessibility, and inclusivity. Our digital-first approach breaks
                            down barriers, making banking services available to anyone.
                        </p>
                        <ul className="mt-4 lg:mt-5 font-serif">
                            <li className="relative text-black font-bold text-base md:text-lg lg:text-xl pl-8 md:pl-9 mb-3 last:mb-0"
                                data-aos="fade-up" data-aos-duration="500" data-aos-delay="300">
                                <div className="absolute left-0 top-0 -mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                        <path
                                            d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z"
                                            fill="black"/>
                                    </svg>
                                </div>
                                Empowering Financial Freedom
                            </li>
                            <li className="relative text-black font-bold text-base md:text-lg lg:text-xl pl-8 md:pl-9 mb-3 last:mb-0"
                                data-aos="fade-up" data-aos-duration="500" data-aos-delay="400">
                                <div className="absolute left-0 top-0 -mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                        <path
                                            d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z"
                                            fill="black"/>
                                    </svg>
                                </div>
                                Simplifying Complexity
                            </li>
                            <li className="relative text-black font-bold text-base md:text-lg lg:text-xl pl-8 md:pl-9 mb-3 last:mb-0"
                                data-aos="fade-up" data-aos-duration="500" data-aos-delay="500">
                                <div className="absolute left-0 top-0 -mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                        <path
                                            d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z"
                                            fill="black"/>
                                    </svg>
                                </div>
                                Seamless Banking
                            </li>
                        </ul>
                        <div className="border-t border-gray-300 mt-6 pb-6 md:mt-8 md:pb-8 xl:mt-12 xl:pb-12"></div>
                        <h3 className="text-black font-bold text-lg md:text-xl lg:text-2xl mb-2 lg:mb-3"
                            data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">
                            Our Vision
                        </h3>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4" data-aos="fade-up"
                           data-aos-duration="500" data-aos-delay="200">
                            We stand for transparency, accessibility, and inclusivity. Our digital-first approach breaks
                            down barriers, making banking services available to anyone.
                        </p>
                        <ul className="mt-4 lg:mt-5 font-serif">
                            <li className="relative text-black font-bold text-base md:text-lg lg:text-xl pl-8 md:pl-9 mb-3 last:mb-0"
                                data-aos="fade-up" data-aos-duration="500" data-aos-delay="300">
                                <div className="absolute left-0 top-0 -mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                        <path
                                            d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z"
                                            fill="black"/>
                                    </svg>
                                </div>
                                Pioneering a Digital Financial Frontier
                            </li>
                            <li className="relative text-black font-bold text-base md:text-lg lg:text-xl pl-8 md:pl-9 mb-3 last:mb-0"
                                data-aos="fade-up" data-aos-duration="500" data-aos-delay="400">
                                <div className="absolute left-0 top-0 -mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                        <path
                                            d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z"
                                            fill="black"/>
                                    </svg>
                                </div>
                                Enabling a Future of Financial Inclusivity
                            </li>
                            <li className="relative text-black font-bold text-base md:text-lg lg:text-xl pl-8 md:pl-9 mb-3 last:mb-0"
                                data-aos="fade-up" data-aos-duration="500" data-aos-delay="500">
                                <div className="absolute left-0 top-0 -mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                        <path
                                            d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z"
                                            fill="black"/>
                                    </svg>
                                </div>
                                Transforming Banking Experiences
                            </li>
                        </ul>
                        <Link data-aos="fade-up" data-aos-duration="500"
                           data-aos-delay="600"
                           className="mt-[25px] md:mt-[30px] xl:mt-[40px] 2xl:mt-[50px] py-[11px] md:py-[12px] lg:py-[13px] px-[30px] md:px-[40px] inline-block text-white text-[13px] md:text-[14px] font-medium uppercase border border-[#0a64bc] bg-[#0a64bc] rounded-full transition-all hover:bg-white hover:text-[#0a64bc] aos-init aos-animate"
                              href="/signIn"> Open Account </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionVision;
