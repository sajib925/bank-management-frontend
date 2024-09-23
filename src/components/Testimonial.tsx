import React from 'react';
import Link from "next/link";
import {QuotetinIcon} from "@/lib/icons";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            text: "I run a business that requires me to be on the move constantly. With Tartu, I've found the perfect financial partner. Their seamless mobile app lets me manage my finances.",
            name: "Bessie Cooper",
            title: "CEO at Envato",
            img: "https://angular.hibootstrap.com/tartu/assets/images/users/user1.jpg",
        },
        {
            id: 2,
            text: "I run a business that requires me to be on the move constantly. With Tartu, I've found the perfect financial partner. Their seamless mobile app lets me manage my finances, transfer funds, and even handle international transactions effortlessly.",
            name: "Jenny Wilson",
            title: "Nintendo",
            img: "https://angular.hibootstrap.com/tartu/assets/images/users/user3.jpg",
        },
        {
            id: 3,
            text: "I can’t imagine managing my investments without Tartu. Their expert advice has helped me make informed decisions.",
            name: "John Doe",
            title: "Entrepreneur",
            img: "https://angular.hibootstrap.com/tartu/assets/images/users/user5.jpg",
        },
        {
            id: 4,
            text: "Tartu's customer service is outstanding. They are always ready to assist me with my queries.",
            name: "Sarah Smith",
            title: "Marketing Manager",
            img: "https://angular.hibootstrap.com/tartu/assets/images/users/user2.jpg",
        },
        {
            id: 5,
            text: "Thanks to Tartu, I've gained confidence in managing my financial portfolio. Highly recommend!",
            name: "Michael Johnson",
            title: "Freelancer",
            img: "https://angular.hibootstrap.com/tartu/assets/images/users/user4.jpg",
        },
        {
            id: 6,
            text: "Tartu has streamlined my finances, allowing me to focus on what I love—growing my business.",
            name: "Emily Davis",
            title: "Business Owner",
            img: "https://angular.hibootstrap.com/tartu/assets/images/users/user6.jpg",
        },
    ];

    return (
        <section className="py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                    <span className="block uppercase font-medium text-blue-600 mb-2">Testimonials</span>
                    <h2 className="text-black font-bold text-2xl md:text-3xl lg:text-4xl">Success Stories: Clients Share Their Journey</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="mb-[15px] md:mb-[20px]">
                                <QuotetinIcon />
                            </div>
                            <p className="text-gray-700 mb-4">{testimonial.text}</p>
                            <div className="flex items-center">
                                <img src={testimonial.img} alt={`${testimonial.name}'s avatar`}
                                     className="rounded-full w-14 h-14"/>
                                <div className="ml-4">
                                    <h3 className="text-black font-bold">{testimonial.name}</h3>
                                    <span className="text-gray-600">{testimonial.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="#" className="inline-block uppercase text-blue-600 font-medium hover:underline">
                        View All Feedback
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
