import { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogOne = () => {
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
          src="https://images.ctfassets.net/5i1m3im8l2b5/4USD6n19mDElNYSVJGb3rS/de02a8a1774953e5429b6dfbadcb0dbf/offset-card-03.jpg?w=856&h=418&q=75&fm=webp&fit=fill"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute top-0 z-20 text-white flex flex-col gap-9 md:gap-9 items-center justify-center h-full w-full">
          <h4 className="text-sm leading-[14px] font-medium text-white bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors rounded-md md:rounded-md px-[14px] py-[7px] flex items-center justify-center gap-3">
            News
          </h4>
          <h1 className="font-medium md:font-semibold text-[40px] md:text-[44px] w-full sm:w-[550px] md:w-[1000px] text-center leading-snug md:leading-[54px]">
            How organisations can champion women every day of the year
          </h1>
        </div>
      </section>

      <section className="relative p-10 md:px-[262px] md:py-[80px] flex flex-col gap-9 items-center w-full justify-center">
        <div className="w-full flex flex-col md:flex-row gap-[66px] justify-between">
          <div className="flex flex-col items-start gap-[10px] md:pt-[78px]">
            <h3 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-white py-[9px] px-[17px] rounded-full font-semibold text-[14px] leading-[14px]">
              An Everyday Endeavor
            </h3>
            <h2 className="font-mediium text-[30.68px] md:text-[40px] w-full sm:w-[530px] md:w-[382px] leading-[45px] text-[#010910]">
              Empowering Through Action
            </h2>
            <p className="text-[16px] text-black leading-[28.8px] font-normal mt-[10px] w-full md:w-[382px]">
              Organizations can truly champion women by taking concrete steps
              that go beyond International Women's Day. This means fostering a
              culture of inclusion and opportunity. Start by examining hiring
              practices and promotion processes to identify and remove
              unconscious bias. Implement mentorship programs that connect women
              with experienced leaders who can guide their careers. Offer
              flexible work arrangements that cater to the diverse needs of
              working women, allowing them to thrive both professionally and
              personally.
            </p>
          </div>

          <img
            src="https://www.instyle.com/thmb/gj9PbtDuduTf0Gi2GIAqrAWxkm8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IS_020122_StateoftheArts_Beauty-2000-00ccc0cf717849738608f915bb8dc55a.jpg"
            alt=""
            className="w-full md:w-[500px]  border-[18px] md:border-[25px] rounded-3xl object-cover"
          />
        </div>

        <div className="relative flex flex-col gap-8 items-center w-full justify-center">
          <h3 className="font-mediium text-[30.68px] md:text-[40px] w-full leading-[45px] text-[#010910]">
            Celebrating Achievements
          </h3>
          <p className="text-[16px] text-black leading-[28.8px] font-normal w-full">
            Championing women also involves celebrating their achievements.
            Recognize and reward outstanding work by women at all levels.
            Amplify their voices within the organization by providing
            opportunities for them to present their ideas and lead projects.
            Shine a light on successful women in your industry through internal
            communications or even sponsor industry awards that recognize female
            talent.
          </p>
        </div>

        <Link
          to="/blog/two"
          className="w-full sm:w-[660px] h-[334px] md:w-full md:h-[396px] relative rounded-2xl cursor-pointer group mt-20"
        >
          <div className="absolute z-10 opacity-50 w-full h-full  bg-black rounded-2xl group-hover:opacity-60 transition-all"></div>

          <img
            src="https://images.ctfassets.net/5i1m3im8l2b5/1WN9uB05X2ieNVAR5n9UK4/218fda8193a361ca4c5f9e7ea4922ea4/offset-card-04.jpg?w=856&h=418&q=75&fm=webp&fit=fill"
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 max-w-max max-h-max mx-auto my-auto z-20 text-white flex flex-col gap-4 items-center justify-center px-5 sm:px-1">
            <h4 className="text-lg leading-[14px] font-medium text-white px-[14px] py-[7px] flex items-center justify-center gap-3">
              Next post
            </h4>

            <h1 className="font-medium md:font-semibold text-[30px] md:text-[40px] w-full sm:w-[550px] md:w-[600px] leading-snug md:leading-snug text-center">
              Apple Vision Pro and its future in the business world
            </h1>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default BlogOne;
