import discordIcon from "../../assets/discordIcon.png";
import xIcon from "../../assets/xIcon.png";
import telegramIcon from "../../assets/telegramIcon.png";

const invertedXIconStyle = {
  filter: "invert(1)", // Invert the color to white
};

const Footer = () => {
  return (
    <footer
      className="bg-[#04071b] p-8 text-white bottom-0 w-full"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div>
          <h2 className="text-white font-bold text-1.5rem">AllowFlow</h2>
          <p className="text-[rgba(255, 255, 255, 0.50)] text-0.9375rem">
            All rights reserved by AllowFlow, 2023 |{" "}
            <span className="underline">Terms of Service</span>{" "}
            <span className="mx-1">|</span>{" "}
            <span className="underline">Privacy Policy</span>
          </p>
        </div>

        {/* Right side */}
        <div>
          <div className="text-[rgba(255, 255, 255, 0.90)] text-0.9375rem flex items-end p-2 mr-2">
            <a href="#" className="mr-4 hover:text-white">
              About Us
            </a>
            <a href="#" className="hover:text-white">
              FAQs
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center">
            <img src={discordIcon} alt="Discord" className="w-4 h-4 mx-2" />
            <img
              src={xIcon}
              alt="X"
              className="w-4 h-4 mx-2"
              style={invertedXIconStyle}
            />
            <img src={telegramIcon} alt="Telegram" className="w-4 h-4 mx-2" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
