import aboutImg from '../../assets/images/about.jpg'; // Path to the old image

const AboutSection = () => {
  return (
    <section className="flex flex-col md:flex-row  items-center py-12 px-6 md:px-12 mt-12 ">
      {/* Left Side: Old Image with Custom Title */}
      <div className="relative md:w-1/2 mb-8 md:mb-0">
        <img
          src={aboutImg}
          alt="About Us"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        {/* Title Overlay */}
        <div className="absolute bottom-0 right-0 p-6 text-white bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
          <p className="text-sm md:text-base lg:text-lg ">
          Streamline your tech asset management.
          </p>
        </div>
      </div>

      {/* Right Side: Information */}
      <div className="md:w-1/2 text-center md:text-left p-6 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#35A6DE]">
          Why Choose Us?
        </h3>
        <ul className="list-disc list-inside space-y-6 text-gray-600">
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#35A6DE] mr-3 mt-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <div>
              <p className="font-semibold">Comprehensive Tracking:</p>
              <p>
                Efficiently monitor and manage all your residential assets from a single platform, ensuring you stay organized and up-to-date.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#35A6DE] mr-3 mt-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <div>
              <p className="font-semibold">Intuitive Tools:</p>
              <p>
                Utilize user-friendly features designed for detailed property analysis and easy organization, making asset management a breeze.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#35A6DE] mr-3 mt-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <div>
              <p className="font-semibold">Seamless Connectivity:</p>
              <p>
                Effortlessly connect with potential buyers or tenants through our platform, streamlining communication and increasing opportunities.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#35A6DE] mr-3 mt-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <div>
              <p className="font-semibold">Investment Insights:</p>
              <p>
                Gain valuable insights and analytics to maximize the value of your investments, helping you make well-informed decisions.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutSection;
