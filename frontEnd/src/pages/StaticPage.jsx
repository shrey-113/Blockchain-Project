import ReactPlayer from "react-player";
import styled from "styled-components";
import video from "../../src/assets/vid.webm";
import dynthresh from "../assets/dynthresh.png";
import notif from "../assets/notif.png";
import time from "../assets/time.png";
import stars from "../assets/stars.png";
import Header from "../components/layout/Header";

// Styled Video Player
const StyledVideoPlayer = styled(ReactPlayer)`
  border-radius: 15px;
  overflow: hidden;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-top: 1000rem;
`;

const FeatureComponent = ({ icon, heading, content }) => {
  return (
    <>
      <div className="flex justify-center items-center mt-16">
        <div className="flex items-center">
          <div className="mr-8">{icon}</div>
          <div>
            <h3 className="text-white font-bold text-2xl mb-4">{heading}</h3>
            <p className="text-white">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const StaticPage = () => {
  return (
    <>
      <Header reap={false} mt={false} cw={true} />
      <img
        className="absolute top-0 left-0  w-full h-[55rem] object-cover z-1"
        src={stars}
        alt="Stars Background"
      />
      <div className="z-10">
        <div className="grid w-5/6 top-16 p-8 relative">
          <div className="col-span-8 left-content text-left ml-5 mb-8">
            {/* AllowFlow Heading */}
            <h2 className="text-white font-bold text-7xl mt-8">AllowFlow</h2>
            {/* AllowFlow Description */}
            <p className="text-white w-[30rem] text-xl font-light mt-4">
              Empower seamless token management with AllowFlow, where permission
              meets flexibility in the DeFi space.
            </p>

            {/* Buttons */}
            <div className="flex mt-8">
              <button className="bg-[#E59500] text-white px-6 py-3 rounded-full mr-4">
                Join the Newsletter
              </button>
              <button className="border-[#E59500] text-[#E59500] px-6 py-3 rounded-full">
                How does this work?
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="col-span-4 mt-[15rem]">
            <StyledVideoPlayer
              url={video}
              width="50%"
              height="auto"
              controls={false}
              playing
            />
          </div>
        </div>
      </div>

      <div className="  ml-auto mr-auto mt-[150px] mb-[250px] max-w-2xl flex-grow z-10">
        {/* Feature Components */}
        <FeatureComponent
          icon={
            <img
              src={notif}
              alt="Notification Icon"
              className="w-[10rem] h-24"
            />
          }
          heading="Event Driven Notifications"
          content="Stay informed with real-time notifications on token transactions and changes in permission settings, providing transparency and enhancing user awareness within the AllowFlow ecosystem."
        />

        <FeatureComponent
          icon={
            <img
              src={dynthresh}
              alt="Dynamic Thresholds"
              className="w-[8rem] h-24"
            />
          }
          heading="Dynamic Thresholds"
          content="Set flexible and dynamic allowance thresholds, adapting to changing conditions and user preferences for a personalized token access experience."
        />

        <FeatureComponent
          icon={
            <img
              src={time}
              alt="Time-Limited Permissions"
              className="w-[10rem] h-24"
            />
          }
          heading="Time-Limited Permissions"
          content="Enhance security and control with time-limited allowances, allowing token holders to grant access for specific durations, adding an extra layer of temporal granularity."
        />
      </div>
    </>
  );
};
export default StaticPage;
