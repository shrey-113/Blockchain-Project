// AboutUsPage.js
import Header from "../components/layout/Header";

const AboutUsPage = () => {
  return (
    <div>
      <Header />
      <main className="p-5 bg-light-blue">
        <div className="flex justify-center items-center h-screen">
          <div className="w-full sm:w-10/12 md:w-1/2">
            <h2 className="text-xl font-semibold text-vnet-blue mb-2">
              About Us
            </h2>
            <p className="text-gray-900">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              odio id justo euismod congue. In hac habitasse platea dictumst.
              Duis sit amet facilisis dui, vel consectetur orci. Integer
              bibendum imperdiet odio, non pellentesque massa congue nec.
            </p>
            {/* Add more content as needed */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUsPage;
