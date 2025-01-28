import { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogTwo = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col pt-[66px] md:pt-[80px]">
      <section className="relative border h-[300px] md:h-[550px]">
        <div className="absolute z-10 opacity-20 w-full h-full  bg-black"></div>

        <img
          src="https://images.ctfassets.net/5i1m3im8l2b5/1WN9uB05X2ieNVAR5n9UK4/218fda8193a361ca4c5f9e7ea4922ea4/offset-card-04.jpg?w=856&h=418&q=75&fm=webp&fit=fill"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute top-0 z-20 text-white flex flex-col gap-9 md:gap-9 items-center justify-center h-full w-full">
          <h4 className="text-sm leading-[14px] font-medium text-white bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors rounded-md md:rounded-md px-[14px] py-[7px] flex items-center justify-center gap-3">
            News
          </h4>
          <h1 className="font-medium md:font-semibold text-[40px] md:text-[44px] w-full sm:w-[550px] md:w-[1000px] text-center leading-snug md:leading-[54px]">
            Apple Vision Pro and its future in the business world
          </h1>
        </div>
      </section>

      <section className="relative p-10 md:px-[262px] md:py-[80px] flex flex-col gap-9 items-center w-full justify-center">
        <div className="w-full flex flex-col md:flex-row gap-[66px] justify-between">
          <div className="flex flex-col items-start gap-[10px] md:pt-[78px]">
            <h3 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-white py-[9px] px-[17px] rounded-full font-semibold text-[14px] leading-[14px]">
              Transforming Business Operations
            </h3>
            <h2 className="font-mediium text-[30.68px] md:text-[40px] w-full sm:w-[530px] md:w-[382px] leading-[45px] text-[#010910]">
              Enhanced Productivity and Efficiency
            </h2>
            <p className="text-[16px] text-black leading-[28.8px] font-normal mt-[10px] w-full md:w-[382px]">
              Apple Vision Pro, a future-looking technology, has the potential
              to revolutionize the business world. Imagine a warehouse where
              smart glasses identify and track inventory in real-time,
              eliminating the need for manual scanning and streamlining
              operations. Surgeons could use augmented reality to visualize
              patient data during procedures, leading to greater precision and
              improved outcomes. These are just a few examples of how Apple
              Vision Pro can enhance productivity and efficiency across various
              industries.
            </p>
          </div>

          <img
            src="https://media.wired.com/photos/65a97963ccf1dfc503548728/16:9/w_2400,h_1350,c_limit/Gear-julian-chokkattu-apple-vision-pro-sitting-source-apple.jpg"
            alt=""
            className="w-full md:w-[500px]  border-[18px] md:border-[25px] rounded-3xl object-cover"
          />
        </div>

        <div className="relative flex flex-col gap-8 items-center w-full justify-center">
          <h3 className="font-mediium text-[30.68px] md:text-[40px] w-full leading-[45px] text-[#010910]">
            A Catalyst for Innovation
          </h3>
          <p className="text-[16px] text-black leading-[28.8px] font-normal w-full">
            Beyond its practical applications, Apple Vision Pro can serve as a
            catalyst for innovation. The ability to overlay digital information
            onto the real world opens doors for new and creative solutions.
            Imagine marketing campaigns that come alive through augmented
            reality experiences, or training programs that utilize interactive
            3D models for a more immersive learning environment. Apple Vision
            Pro has the potential to reshape how businesses operate and create
            entirely new possibilities for the future.
          </p>
        </div>

        <Link
          to="/blog/three"
          className="w-full sm:w-[660px] h-[334px] md:w-full md:h-[396px] relative rounded-2xl cursor-pointer group mt-20"
        >
          <div className="absolute z-10 opacity-50 w-full h-full  bg-black rounded-2xl group-hover:opacity-60 transition-all"></div>

          <img
            src="https://assets-global.website-files.com/646f9696be2579248b7e3010/65ca1077dd9ec27336b4e220_Decision-Making-Header-001%20(1)-p-500.jpg"
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 max-w-max max-h-max mx-auto my-auto z-20 text-white flex flex-col gap-4 items-center justify-center px-5 sm:px-1">
            <h4 className="text-lg leading-[14px] font-medium text-white px-[14px] py-[7px] flex items-center justify-center gap-3">
              Next post
            </h4>

            <h1 className="font-medium md:font-semibold text-[30px] md:text-[40px] w-full sm:w-[550px] md:w-[600px] leading-snug md:leading-snug text-center">
              Building a culture of effective decision-making
            </h1>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default BlogTwo;
