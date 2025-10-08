import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 sm:px-10 max-w-7xl mx-auto text-gray-700">

      {/* About Us Heading */}
      <div className="text-center text-3xl pt-12 font-semibold text-gray-600">
        <p>
          About <span className="text-gray-800">Us</span>
        </p>
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row items-start gap-10 md:items-start">

        <div className="w-full md:max-w-[360px] h-[300px] overflow-hidden rounded-lg shadow-md">
  <img
    src="aboutpage2.jpg"
    alt="About Us"
    className="w-full h-full object-cover"
  />
</div>




        <div className="flex-1 flex flex-col gap-5 text-[15px] text-gray-600 leading-relaxed">
          <p>
            At <span className="font-semibold text-primary">Doqto</span>, we aim to make healthcare more accessible by helping patients easily connect with trusted doctors. Our platform simplifies appointment booking, allowing users to browse profiles and schedule in-person visits quickly and conveniently.
          </p>
          <p>
            Doqto is built for ease and trust. Patients can view doctor details, check availability, and book appointments in just a few steps—no long queues, no confusion, just simple, efficient healthcare access.
          </p>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Our Vision</h3>
            <p>
              Our vision is to create a seamless healthcare experience where patients can confidently find and connect with the right doctor. We strive to build a future of simple, accessible, and efficient in-person care for all.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Heading */}
      <div className="text-center text-2xl font-semibold text-gray-600 mb-10">
        <p>
          Why <span className="text-gray-800">Choose Us</span>
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        <div className="border rounded-xl p-8 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
          <h4 className="text-lg font-semibold mb-3">Efficiency</h4>
          <p className="text-[15px]">
            Doqto streamlines the appointment process by eliminating unnecessary steps. With fast search, clear doctor profiles, and instant booking, patients save time and effort, making healthcare access quicker, smoother, and more efficient.
          </p>
        </div>

        <div className="border rounded-xl p-8 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
          <h4 className="text-lg font-semibold mb-3">Convenience</h4>
          <p className="text-[15px]">
            Designed for simplicity, Doqto lets users find nearby doctors, view availability, and book appointments—all in one place. No more long waits or phone calls, just easy, modern scheduling.
          </p>
        </div>

        <div className="border rounded-xl p-8 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
          <h4 className="text-lg font-semibold mb-3">Personalization</h4>
          <p className="text-[15px]">
            We believe healthcare should feel personal. Users can choose doctors based on specialty, location, and preferences—ensuring appointments are tailored to comfort, trust, and quality care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
