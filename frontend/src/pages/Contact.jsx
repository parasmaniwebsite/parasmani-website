import { FaWhatsapp } from "react-icons/fa";
import contectpageimg from "../assets/contactpage/contactpage.jpeg";
import EnquiryForm from "../components/EnquiryForm";
import { WHATSAPP_URL } from "../components/WhatsAppFloat";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

const Contact = () => {
  return (
    <div className="w-full bg-white font-albert text-[#272727] tracking-tight antialiased select-none">
      {/* 🔷 HERO SECTION */}
      {/* Hero — mobile (stacked, image on top, centered text) */}
      <div className="md:hidden bg-white">
        <div className="relative w-full h-[190px]">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10" />
          <img
            src={contectpageimg}
            alt="Contact Parasmani"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>
        <div className="px-5 pt-5 pb-8 text-center">
          <h1 className="h1 text-[#18234D] tracking-tight mb-3">Contact Us</h1>
          <p className="p1 text-[#19234D] font-light leading-relaxed opacity-95 font-albert max-w-[440px] mx-auto">
            Our technical team is ready to assist with your specific copper tube
            requirements.
          </p>
        </div>
      </div>

      {/* Hero — desktop */}
      <section
        className="relative w-full min-h-[220px] md:min-h-[260px] lg:min-h-[280px] hidden md:flex md:items-center overflow-hidden "
        style={{
          backgroundImage: `url('${contectpageimg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-xl text-left">
            <h1 className="h1 text-[#18234D] tracking-tight mb-4">
              Contact Us
            </h1>
            <p className="p1 text-[#19234D] font-light leading-5 max-w-[340px] md:max-w-[480px] opacity-95 font-albert">
              Our technical team is ready to assist with your <br /> specific
              copper tube requirements.
            </p>
          </div>
        </div>
      </section>

      {/* 🔷 MAIN SPLIT GRID RENDER STAGE */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 selection:bg-[#18234D]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* 📝 1. FORM COLUMN PANEL */}
          <div className="lg:col-span-6 bg-[#F8F9FB] p-6 sm:p-8 md:p-12 rounded-[24px] border border-gray-100/80 w-full flex flex-col justify-between">
            <div>
              <h3 className="text-[24px] font-obviously font-normal text-[#1A1A1A] mb-2 tracking-tight">
                Get In Touch
              </h3>
              <p className="text-[#555555] text-[14px]  font-albert font-light mb-10 max-w-sm leading-relaxed">
                Fill in the form and our team will respond within 24 hours.
              </p>

              <EnquiryForm />
            </div>
          </div>

          {/* 📞 2. DIRECT CONTACT INFO COLUMN */}
          <div className="lg:col-span-6 pt-12 lg:pl-6 flex flex-col justify-between w-full py-2">
            {/* Top Typography & List wrapper */}
            <div className="mb-8 lg:mb-0">
              <h3 className="text-[24px] font-obviously font-normal text-[#1A1A1A] mb-2 tracking-tight">
                Reach Out
              </h3>
              <p className="text-[#555555] text-[14px]  font-albert font-light mb-10 max-w-md leading-relaxed">
                Let's connect. Share your requirements and we'll take it
                forward.
              </p>

              <div className="space-y-6 md:space-y-7">
                {/* Call Rows */}
                <div className="flex items-start gap-5">
                  <div className="bg-[#C48A54] w-[42px] h-[42px] rounded-full text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <IoCallOutline className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[20px] text-[#1A1A1A] font-albert tracking-tight">
                      Call Us
                    </h4>
                    <p className="text-[#555555] text-[13.5px] md:text-[14px] mt-1 font-normal font-albert">
                      +91 98191 34044 | +91 81698 08254
                    </p>
                  </div>
                </div>

                {/* Email Support Rows */}
                <div className="flex items-start gap-5">
                  <div className="bg-[#C48A54] w-[42px] h-[42px] rounded-full text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <HiOutlineMail className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[20px] text-[#1A1A1A] font-albert tracking-tight">
                      Email Support
                    </h4>
                    <p className="text-[#555555] text-[13.5px] md:text-[14px] mt-1 font-normal font-albert break-all sm:break-normal">
                      sales@parasmanicopper.com | preetadani@parasmanicopper.com
                    </p>
                  </div>
                </div>

                {/* Plant Factory Location */}
                <div className="flex items-start gap-5">
                  <div className="bg-[#C48A54] w-[42px] h-[42px] rounded-full text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <IoLocationOutline className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[20px] text-[#1A1A1A] font-albert tracking-tight">
                      Factory Location
                    </h4>
                    <p className="text-[#555555] text-[13.5px] md:text-[14px] mt-1 leading-relaxed font-normal font-albert max-w-md">
                      5/2, GIDC, Umbergaon, Valsad, Gujarat - 396171, INDIA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 🟢 3. QUICK ENQUIRY LINED FRAME BOX */}
            <div className="bg-[#F8F9FB] sm:bg-transparent p-5 sm:p-4 md:p-6 rounded-2xl border border-gray-400/70 flex flex-col sm:flex-row items-center justify-between gap-5 mt-6 lg:mt-4">
              <div className="text-center sm:text-left">
                <h4 className="text-[#1A1A1A] text-[24px] font-albert font-medium tracking-tight">
                  Quick Enquiry
                </h4>
                <p className="text-[#555555] text-[12.5px] md:text-[13px] mt-1 leading-relaxed font-normal font-albert">
                  Need a custom quote or technical advice?{" "}
                  <br className="hidden sm:inline" />
                  Our engineers respond within 24 hours.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="b2 bg-[#1AD054] text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold hover:bg-[#16B84A] transition-all whitespace-nowrap shadow-sm active:scale-95"
              >
                <FaWhatsapp className="text-xl" /> Whatsapp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ INTEGRATED GEOLOCATION REGION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 bg-white">
        <div className="w-full h-[240px] md:h-[450px] rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-sm relative">
          <iframe
            src="https://maps.google.com/maps?q=Parasmani%20Tubes%20GIDC%20Umbergaon&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Parasmani Tubes Copper Private Limited Location"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;