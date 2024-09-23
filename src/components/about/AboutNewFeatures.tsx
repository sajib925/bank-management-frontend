import React from 'react';

const AboutNewFeatures = () => {
    return (
        <div className="pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[120px]">
            <div className="pt-[60px] md:pt-[80px] lg:pt-[100px] xl:pt-[120px]">
                <div className="container mx-auto px-[12px] 2xl:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div
                            className="rounded-[20px] bg-center bg-cover bg-no-repeat"
                            style={{ backgroundImage: "url('https://angular.hibootstrap.com/tartu/assets/images/girl-with-card.jpg')" }}
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="100"
                        >
                            {/*<img*/}
                            {/*    src="https://angular.hibootstrap.com/tartu/assets/images/girl-with-card.jpg"*/}
                            {/*    alt="features-image"*/}
                            {/*    className="rounded-[20px] lg:hidden"*/}
                            {/*/>*/}
                        </div>
                        <div className="bg-white rounded-[20px] py-[35px] px-[20px] md:py-[70px] md:px-[40px] lg:py-[80px] lg:px-[25px] xl:py-[90px] xl:px-[50px] 2xl:py-[100px] 2xl:px-[70px]">
              <span
                  className="block uppercase font-medium text-[14px] md:text-[15px] lg:text-[16px] text-[#0a64bc] mb-[7px] md:mb-[8px] lg:mb-[10px]"
                  data-aos="fade-up"
                  data-aos-duration="500"
                  data-aos-delay="100"
              >
                Best Features
              </span>
                            <h2
                                className="text-black font-bold font-serif text-[28px] md:text-[34px] lg:text-[38px] xl:text-[42px] leading-[1.2] mb-[20px] lg:mb-[30px] xl:mb-[40px] xl:max-w-[475px]"
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay="200"
                            >
                                Your Dreams, Our Digital Solutions.
                            </h2>
                            <div
                                className="mb-[20px] md:mb-[25px] xl:mb-[30px] 2xl:mb-[35px] last:mb-0"
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay="300"
                            >
                                <h3 className="font-bold font-serif text-black text-[18px] md:text-[20px] lg:text-[22px] mb-[10px] lg:mb-[12px] 2xl:mb-[15px]">
                                    1. Seamless Accessibility Anytime, Anywhere
                                </h3>
                                <p className="text-[14px] md:text-[15px] text-[#4c4c4c] leading-[1.7]">
                                    Digital banking brings the convenience of managing your finances right to your fingertips. With mobile apps and online platforms, you can access your accounts, make transactions, pay bills, and monitor your financial activities from the comfort of your home, office, or even on-the-go.
                                </p>
                            </div>
                            <div
                                className="mb-[20px] md:mb-[25px] xl:mb-[30px] 2xl:mb-[35px] last:mb-0"
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay="400"
                            >
                                <h3 className="font-bold font-serif text-black text-[18px] md:text-[20px] lg:text-[22px] mb-[10px] lg:mb-[12px] 2xl:mb-[15px]">
                                    2. Intelligent Financial Insights and Management
                                </h3>
                                <p className="text-[14px] md:text-[15px] text-[#4c4c4c] leading-[1.7]">
                                    One of the most compelling features of digital banking is its ability to provide deep insights into your financial health. With advanced analytics, you can track spending patterns, set budgets, and receive personalized recommendations to help you make informed money decisions.
                                </p>
                            </div>
                            <div
                                className="mb-[20px] md:mb-[25px] xl:mb-[30px] 2xl:mb-[35px] last:mb-0"
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay="500"
                            >
                                <h3 className="font-bold font-serif text-black text-[18px] md:text-[20px] lg:text-[22px] mb-[10px] lg:mb-[12px] 2xl:mb-[15px]">
                                    3. Secure and Advanced Transaction Capabilities
                                </h3>
                                <p className="text-[14px] md:text-[15px] text-[#4c4c4c] leading-[1.7]">
                                    Digital banking prioritizes security without sacrificing convenience. Advanced encryption, biometric authentication, and multi-factor verification methods ensure that your sensitive financial data remains protected. Beyond security, digital banking offers a wide array of transaction capabilities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutNewFeatures;
