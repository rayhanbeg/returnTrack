const Packages = () => {
  return (
    <div className=" py-16">
      <div className="container px-6 py-8 mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#35A6DE] mb-6">
          Simple Pricing Plans
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Explore our flexible pricing plans designed to meet your needs. Choose the right plan and enjoy seamless features without hidden costs.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {['Basic', 'Standard', 'Pro'].map((plan) => (
            <div
              key={plan}
              className="relative w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div
                className={`absolute inset-0 bg-[#35A6DE] rounded-b-lg transform -translate-y-1/2 ${plan === 'Basic' ? 'h-24' : plan === 'Standard' ? 'h-32' : 'h-40'}`}
              />
              <div className="relative p-6 pt-16 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-white mb-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {plan}
                </h2>
                <p className="text-gray-500 mb-6">
                  Perfect for {plan.toLowerCase()} users.
                </p>
                <h3 className="text-4xl font-bold text-[#35A6DE] mb-2">
                  {plan === 'Basic' ? '$5' : plan === 'Standard' ? '$8' : '$15'}
                </h3>
                <span className="text-gray-600 text-lg">/Month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
