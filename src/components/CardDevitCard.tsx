import React from 'react';

const CreditDebitCard = () => {
    return (
        <div className="py-[60px] md:py-[80px] lg:py-[100px] xl:py-[120px]">
            <div className="container mx-auto px-[12px] 2xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[25px]">
                    <div className="self-center">
                        <span className="block uppercase font-medium text-[14px] md:text-[15px] lg:text-[16px] text-[#0a64bc] mb-[7px] md:mb-[8px] lg:mb-[10px]">
                            Credit & Debit Card
                        </span>
                        <h2 className="text-black font-bold font-serif text-[28px] md:text-[34px] lg:text-[38px] xl:text-[42px] leading-[1.2] mb-[12px] lg:mb-[15px]">
                            Empowering Financial Freedom and Seamless Transactions
                        </h2>
                        <p className="text-[14px] md:text-[15px] text-[#4c4c4c] leading-[1.7] mb-[15px] xl:max-w-[540px]">
                            Credit cards offer flexibility and rewards but come with the responsibility of managing borrowed funds and potential interest. Debit cards provide immediate access to your own money without the need to repay or pay interest. Choosing the right card type depends on your financial goals, spending habits, and comfort level with borrowing.
                        </p>
                        <a
                            href="/about"
                            className="mt-[2px] md:mt-[5px] xl:mt-[15px] py-[11px] md:py-[12px] lg:py-[13px] px-[30px] md:px-[40px] inline-block text-white text-[13px] md:text-[14px] font-medium uppercase border border-[#0a64bc] bg-[#0a64bc] rounded-full transition-all hover:bg-white hover:text-[#0a64bc]"
                        >
                            Learn More
                        </a>
                    </div>
                    <div className="image self-center text-center relative z-[1] before:absolute before:top-0 xl:before:top-[30px] before:-left-[25px] xl:before:left-[30px] 2xl:before:left-[60px] before:-z-[1] before:w-[497px] before:h-[497px] before:rounded-full before:hidden lg:before:block">
                        <img src="https://angular.hibootstrap.com/tartu/assets/images/three-cards.png" alt="card-image" className="inline" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditDebitCard;
