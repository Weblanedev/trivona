import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col pt-[66px] md:pt-[80px]">
      <section className="relative h-[250px] md:h-[300px]">
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
          <h1 className="font-medium md:font-semibold text-[50px] sm:text-[40px] md:text-[50px] md:text-left leading-snug md:leading-[62px] text-center text-blue-950">
            Terms of Use & Privacy Policy
          </h1>
        </div>
      </section>

      <section className="relative p-10 md:px-[262px] md:py-[80px] flex flex-col gap-9 items-center w-full justify-center">
        <div className="relative flex flex-col gap-8 items-center w-full justify-center">
          <h2 className="font-mediium text-[30.68px] md:text-[40px] w-full leading-[45px] text-[#010910]">
            Who we are{" "}
          </h2>
          <p className="text-[16px] text-black leading-[28.8px] font-normal mt-[10px] w-full">
            We provide marketing services to startups and small businesses
            looking for a partner for their digital media. We work with you, not
            for you.We are lorem duoa headquartered in North-Eastern France,
            with our 19 associates located across nine countries in order to
            best serve a client base that stretches throughout North America.
          </p>
        </div>

        <div className="relative flex flex-col gap-8 items-center w-full justify-center">
          <h3 className="font-mediium text-[30.68px] md:text-[40px] w-full leading-[45px] text-[#010910]">
            Comments{" "}
          </h3>
          <p className="text-[16px] text-black leading-[28.8px] font-normal w-full">
            When visitors leave comments on the site we collect the data shown
            in the comments form, and also the visitor’s IP address and browser
            user agent string to help spam detection. An anonymized string
            created from your email address (also called a hash) may be provided
            to the Gravatar service to see if you are using it. The Gravatar
            service privacy policy is available here:
            https://surfnet.site/privacy-policy/. After approval of your
            comment, your profile picture is visible to the public in the
            context of your comment.
          </p>
        </div>

        <div className="relative flex flex-col gap-8 items-center w-full justify-center">
          <h3 className="font-mediium text-[30.68px] md:text-[40px] w-full leading-[45px] text-[#010910]">
            Media{" "}
          </h3>
          <p className="text-[16px] text-black leading-[28.8px] font-normal w-full">
            If you upload images to the website, you should avoid uploading
            images with embedded location data (EXIF GPS) included. Visitors to
            the website can download and extract any location data from images
            on the website.
          </p>

          <ul className="text-[16px] text-black leading-[28.8px] font-normal w-full list-decimal pl-12 md:pl-20 mt-[-9px]">
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
          </ul>
        </div>

        <div className="relative flex flex-col gap-8 items-center w-full justify-center">
          <h3 className="font-mediium text-[30.68px] md:text-[40px] w-full leading-[45px] text-[#010910]">
            Cookies{" "}
          </h3>
          <p className="text-[16px] text-black leading-[28.8px] font-normal w-full">
            If you leave a comment on our site you may opt-in to saving your
            name, email address and website in cookies. These are for your
            convenience so that you do not have to fill in your details again
            when you leave another comment. These cookies will last for one
            year. If you visit our login page, we will set a temporary cookie to
            determine if your browser accepts cookies. This cookie contains no
            personal data and is discarded when you close your browser. When you
            log in, we will also set up several cookies to save your login
            information and your screen display choices. Login cookies last for
            two days, and screen options cookies last for a year. If you select
            “Remember Me”, your login will persist for two weeks. If you log out
            of your account, the login cookies will be removed. If you edit or
            publish an article, an additional cookie will be saved in your
            browser. This cookie includes no personal data and simply indicates
            the post ID of the article you just edited. It expires after 1 day.
          </p>
        </div>

        <div className="relative flex flex-col gap-8 items-center w-full justify-center">
          <h3 className="font-mediium text-[30.68px] md:text-[40px] w-full leading-[45px] text-[#010910]">
            Embedded content from other websites{" "}
          </h3>
          <p className="text-[16px] text-black leading-[28.8px] font-normal w-full">
            Articles on this site may include embedded content (e.g. videos,
            images, articles, etc.). Embedded content from other websites
            behaves in the exact same way as if the visitor has visited the
            other website.
          </p>

          <ul className="text-[16px] text-black leading-[28.8px] font-normal w-full list-decimal pl-12 md:pl-20 mt-[-9px]">
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
            <li>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
