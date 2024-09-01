import Link from "next/link";
import React from "react";

const CTASection = () => {
  return (
    <section
      className={`bg-[url('/image/call-action-bg.png')] bg-no-repeat`}
    >
      <div className="py-20 px-10 flex flex-col ">
        <h2 className="title text-center text-white">
          <span className="block ">Ready to make the leap?</span>
          Let us help you.
        </h2>
        <div className="flex items-center justify-center pt-4 lg:pt-6">
          <Link href={"/contact"} className=" py-3 px-8 font-semibold rounded-sm bg-white border border-white text-slate-900 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all ease-in-out cursor-pointer text-center">
            Connect Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
