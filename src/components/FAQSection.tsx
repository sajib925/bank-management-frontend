"use client"
import { FC, useState, useRef, useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I locate the nearest branch or ATM?",
    answer: "You can locate the nearest branch or ATM by using our online locator tool or our mobile app. Simply enter your location, and we'll show you the closest options."
  },
  {
    question: "What do I do if I lose my card or it gets stolen?",
    answer: "If your card is missing, let us know immediately. We’ll block your card right away and send over a new one on the same day. To report a lost or stolen card, call us at (406) 555-0120."
  },
  {
    question: "What is your customer service number?",
    answer: "Our customer service number is (406) 555-0120. We are available 24/7 to assist you with your needs."
  },
  {
    question: "How do I reset my PIN?",
    answer: "To reset your PIN, you can log in to your online account, navigate to the security settings, and follow the instructions for resetting your PIN."
  },
  {
    question: "What is required to use Digital Banking?",
    answer: "To use Digital Banking, you need a stable internet connection, a device that can access the internet, and your login credentials."
  },
  {
    question: "Is digital banking secure?",
    answer: "Yes, our digital banking platform is highly secure. We use advanced encryption and multi-factor authentication to protect your data."
  }
];

const FAQSection: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  
    const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    useEffect(() => {
      if (openIndex !== null) {
        const content = contentRefs.current[openIndex];
        if (content) {
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      }
      // Collapse the other sections
      contentRefs.current.forEach((content, i) => {
        if (i !== openIndex && content) {
          content.style.maxHeight = '0px';
        }
      });
    }, [openIndex]);
  
    return (
      <section className="faqs-section account bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h5 className="subTitle">If you have a question, we have an answer</h5>
            <h2 className="title">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-md">
                  <h5>
                    <button
                      className="w-full font-semibold text-[#055c2d] text-lg lg:text-xl text-left px-4 py-3 flex justify-between items-center focus:outline-none"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span>{faq.question}</span>
                      <svg
                        className={`w-6 h-6 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </h5>
                  <div
                    // @ts-ignore 
                    ref={(el) => (contentRefs.current[index] = el)}
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out`}
                    style={{ maxHeight: openIndex === index ? '0px' : '0px' }}
                  >
                    <div className="px-4 py-3 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQSection;