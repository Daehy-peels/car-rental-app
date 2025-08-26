// src/components/Testimonials.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Placeholder testimonial data
const testimonials = [
  {
    quote:
      "The car was perfect for our road trip. Clean, reliable, and great service from start to finish!",
    name: "Jane D.",
    location: "New York, NY",
  },
  {
    quote:
      "Booking was a breeze, and the staff was so friendly. We'll definitely use CarRentals again.",
    name: "John P.",
    location: "Los Angeles, CA",
  },
  {
    quote:
      "I was impressed with the selection and the low prices. A fantastic experience all around.",
    name: "Sarah L.",
    location: "Miami, FL",
  },
  {
    quote:
      "The car was a great value and the pickup process was quick and easy. Highly recommended!",
    name: "Mike T.",
    location: "Chicago, IL",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-text text-center mb-10">
          What Our Customers Say
        </h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 h-full flex flex-col justify-between">
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
