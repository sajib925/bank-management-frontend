import Image from 'next/image';
import React from 'react';

const BusinessSolutions: React.FC = () => {
  return (
    <section className="solutions-business">
      <div className="overlay pt-32">
        <div className="container mx-auto animate-fadeInUp">
          <div className="row justify-center">
            <div className="col-lg-6">
              <div className="section-header text-center">
                <h5 className="sub-title text-lg">Open your account from anywhere in the world</h5>
                <h2 className="title text-4xl font-semibold">Solutions for Every Business Need.</h2>
                <p className="mt-4">Power up your business with a full-stack online bank account that fits your needs.</p>
              </div>
            </div>
          </div>
          <div className="row mt-10">
            <div className="col-lg-4 col-md-6">
              <div className="single-box text-center bg-white shadow-lg p-6 rounded-lg">
                <div className="thumb flex justify-center items-center mb-4">
                  <img
                    alt="checking"
                    src="/_next/static/media/checking.b74e4c88.png"
                    srcSet="/_next/static/media/checking.b74e4c88.png 1x, /_next/static/media/checking.b74e4c88.png 2x"
                    width="80"
                    height="80"
                    className="object-contain"
                  />
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold">Checking Account</h5>
                  <p className="mt-2 text-gray-600">
                    Choose from our checking options that allow you to earn interest, avoid fees, and easily manage your account.
                  </p>
                  <a className="btn-arrow inline-flex items-center mt-4 text-blue-500 hover:text-blue-700" href="/register">
                    Open Account
                    <img
                      alt="arrow"
                      src="/_next/static/media/arrow-right.e355c5aa.png"
                      srcSet="/_next/static/media/arrow-right.e355c5aa.png 1x, /_next/static/media/arrow-right.e355c5aa.png 2x"
                      width="15"
                      height="14"
                      className="ml-2"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-10 md:mt-0">
              <div className="single-box text-center bg-white shadow-lg p-6 rounded-lg">
                <div className="thumb flex justify-center items-center mb-4">
                  <Image
                    alt="savings"
                    src="/image"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold">Savings Accounts</h5>
                  <p className="mt-2 text-gray-600">
                    Save for your goals and watch your money grow with a CD, a money market account, a savings account. Your future starts now.
                  </p>
                  <a className="btn-arrow inline-flex items-center mt-4 text-blue-500 hover:text-blue-700" href="/register">
                    Open Account
                    <img
                      alt="arrow"
                      src="/_next/static/media/arrow-right.e355c5aa.png"
                      srcSet="/_next/static/media/arrow-right.e355c5aa.png 1x, /_next/static/media/arrow-right.e355c5aa.png 2x"
                      width="15"
                      height="14"
                      className="ml-2"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-10 lg:mt-0">
              <div className="single-box text-center bg-white shadow-lg p-6 rounded-lg">
                <div className="thumb flex justify-center items-center mb-4">
                  <img
                    alt="business"
                    src="/_next/static/media/business.844b84ec.png"
                    srcSet="/_next/static/media/business.844b84ec.png 1x, /_next/static/media/business.844b84ec.png 2x"
                    width="80"
                    height="80"
                    className="object-contain"
                  />
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold">Business Account</h5>
                  <p className="mt-2 text-gray-600">
                    Take charge of your business banking with a business bank account. Services including virtual cards, team management, and more.
                  </p>
                  <a className="btn-arrow inline-flex items-center mt-4 text-blue-500 hover:text-blue-700" href="/register">
                    Open Account
                    <img
                      alt="arrow"
                      src="/_next/static/media/arrow-right.e355c5aa.png"
                      srcSet="/_next/static/media/arrow-right.e355c5aa.png 1x, /_next/static/media/arrow-right.e355c5aa.png 2x"
                      width="15"
                      height="14"
                      className="ml-2"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
