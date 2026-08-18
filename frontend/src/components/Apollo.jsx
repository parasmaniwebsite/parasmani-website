import { ChevronLeft, ChevronRight } from "lucide-react";
import apolloLogo from "../assets/homePage/Ellipse 17.png";
import { useState, useEffect } from "react";

const testimonials = [
  {
    logo: apolloLogo,
    title: "Rajesh P, MD, Reacon Engineers — Daikin Authorised Dealer, Kerala",
    text: "We have been using Parasmani's PTP K-Series Copper Tubes for our VRF/VRV projects and found them to perform exceptionally well during pressure testing and commissioning. The consistent quality has given us leak-free installations and reliable system performance.",
  },
  {
    logo: apolloLogo,
    title: "Rupesh Manubhai Patel, Proprietor, Aarav Enterprise — Central Medical Gas Pipeline Systems, Gujarat",
    text: "Parasmani Medical Grade Copper Tubes and Fittings have met our expectations in terms of quality, cleanliness, and dimensional accuracy. They have been suitable for critical medical gas installations and performed satisfactorily during installation and testing.",
  },
  {
    logo: apolloLogo,
    title: "Parijat Ghosh, Director, Mechelectric Hub Enterprise Private Limited, Kolkata",
    text: "We have found Parasmani's products to be of consistent quality with excellent finish, resulting in positive feedback and repeat orders from our customers. Their dependable supply has made them a preferred brand in our product portfolio.",
  },
  {
    logo: apolloLogo,
    title: "Mehul Vohera, Proprietor, Madhukar Impex, Maharashtra",
    text: "Parasmani's copper tubes have consistently met our expectations in terms of quality, finish, and reliability. The products have been well accepted by our customers, leading to repeat business and increased confidence in the brand. Their prompt deliveries and professional support have made them a valued supplier for our organization.",
  },
  {
    logo: apolloLogo,
    title: "K. Nirupama, Admin, Hi-Tech Refrigeration Private Limited, Karnataka",
    text: "As a distributor, we are extremely happy to be associated with Parasmani. Their timely communication, consistent product quality and customer-focused approach have helped us serve our customers more effectively. Parasmani's PTP K-Series for VRF applications has been well accepted in the market and continues to receive positive feedback for its quality and dependable performance.",
  },
];

const Apollo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white px-4 py-[80px] sm:px-6 md:py-[120px]">
      {/* Section Heading */}
      <div className="mx-auto mb-16 text-center">
        <p className="mb-3 eyebrow-2 tracking-[0.3em] text-[#C43A26]">
          TESTIMONIALS
        </p>

        <h2 className="h2 text-[#272727]">
          What Our Clients Say
        </h2>
      </div>

      <div className="relative mx-auto flex max-w-[1269px] items-center justify-center">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="absolute -left-3 z-20 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#D7DDE8] bg-white text-[#14204A] shadow-[0_10px_28px_rgba(20,28,58,0.08)] transition-all hover:bg-[#F8F9FA] md:left-0 md:h-[54px] md:w-[54px]"
        >
          <ChevronLeft size={22} strokeWidth={1.8} />
        </button>

        {/* Card Stack */}
        <div className="relative w-full max-w-[980px] px-10 md:px-0">
          {/* Back Cards */}
          <div className="absolute left-[-54px] top-[34px] hidden h-[350px] w-full rounded-[24px] bg-white shadow-[0_14px_35px_rgba(20,28,58,0.08)] md:block" />
          <div className="absolute left-[-28px] top-[18px] hidden h-[382px] w-full rounded-[24px] bg-white shadow-[0_14px_35px_rgba(20,28,58,0.08)] md:block" />

          <div className="absolute right-[-54px] top-[34px] hidden h-[350px] w-full rounded-[24px] bg-white shadow-[0_14px_35px_rgba(20,28,58,0.08)] md:block" />
          <div className="absolute right-[-28px] top-[18px] hidden h-[382px] w-full rounded-[24px] bg-white shadow-[0_14px_35px_rgba(20,28,58,0.08)] md:block" />

          {/* Main Card */}
          <div className="relative z-10 flex min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-[#E6A15A] bg-white px-5 pt-[78px] pb-[54px] shadow-[0_18px_45px_rgba(20,28,58,0.1)] sm:min-h-[390px] sm:px-8 md:min-h-[430px] md:rounded-[24px] md:pt-[92px] md:pb-[80px]">
            {/* Logo Circle */}
            {/* <div className="absolute left-1/2 top-[-42px] flex h-[84px] w-[84px] -translate-x-1/2 items-center justify-center rounded-full border border-[#D7DDE8] bg-white shadow-[0_10px_24px_rgba(20,28,58,0.15)] md:top-[-52px] md:h-[104px] md:w-[104px]">
              <img
                src={activeTestimonial.logo}
                alt={activeTestimonial.title}
                className="h-[52px] w-[52px] object-contain md:h-[62px] md:w-[62px]"
              />
            </div> */}

            <div
              key={activeIndex}
              className="animate-[fadeSlide_300ms_ease] text-center"
            >
              <h3 className="h3 mb-[20px] leading-[1.2] tracking-normal text-[#4A4A4A] md:mb-[24px]">
                {activeTestimonial.title}
              </h3>

              <p className="p3 mx-auto max-w-[760px] text-center font-albert font-normal leading-[140%] tracking-normal text-[#4A4A4A]">
                {activeTestimonial.text}
              </p>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="absolute -right-3 z-20 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#D7DDE8] bg-white text-[#14204A] shadow-[0_10px_28px_rgba(20,28,58,0.08)] transition-all hover:bg-[#F8F9FA] md:right-0 md:h-[54px] md:w-[54px] "
        >
          <ChevronRight size={22} strokeWidth={1.8} />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-[6px] w-[6px] rounded-full transition-all ${
              activeIndex === index ? "bg-[#14204A] w-[22px]" : "bg-[#D7DDE8]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Apollo;
