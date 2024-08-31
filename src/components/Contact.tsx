"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

// Define an interface for the form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service_interested: string;
  message: string;
}

const ContactForm: React.FC = () => {
  // Use the interface as the type for the useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const mutation = useMutation((data: ContactFormData) => {
    return axios.post('https://bank-management-backend.onrender.com/api/contact/', data);
  });

  // Use the interface as the type for the onSubmit handler
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Your message has been sent successfully!");
      },
      onError: () => {
        toast.error("Something went wrong. Please try again later.");
      }
    });
  };

  return (
    <div className="container mx-auto animate-fadeInUp lg:mt-10 mt-6">
      <div className="flex justify-center">
        <div className="lg:w-2/3">
          <div className="text-center">
            <h2 className="text-2xl lg:text-6xl font-bold">Get in touch with us.</h2>
            <p className="mt-4">Fill up the form and our team will get back to you within 24 hours</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="lg:w-4/5">
          <div className="bg-white p-8 shadow-md rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full sm:w-1/2 px-4 mb-4">
                  <div className='flex flex-col gap-4'>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="What's your name?"
                      {...register('name', { required: true })}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                </div>
                <div className="w-full sm:w-1/2 px-4 mb-4">
                  <div className='flex flex-col gap-4'>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="What's your email?"
                      {...register('email', { required: true })}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full sm:w-1/2 px-4 mb-4">
                  <div className='flex flex-col gap-4'>
                    <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</Label>
                    <Input
                      type="text"
                      id="phone"
                      placeholder="(123) 480 - 3540"
                      {...register('phone', { required: true })}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                </div>
                <div className="w-full sm:w-1/2 px-4 mb-4">
                  <div className='flex flex-col gap-4'>
                    <Label htmlFor="service_interested" className="block text-sm font-medium text-gray-700">Service interested in</Label>
                    <Input
                      type="text"
                      id="service_interested"
                      placeholder="Ex. Auto Loan, Home Loan"
                      {...register('service_interested', { required: true })}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.service_interested ? 'border-red-500' : ''}`}
                    />
                    {errors.service_interested && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 mb-4">
                  <div className='flex flex-col gap-4'>
                    <Label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="I would like to get in touch with you..."
                      {...register('message', { required: true })}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.message ? 'border-red-500' : ''}`}
                    ></Textarea>
                    {errors.message && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
