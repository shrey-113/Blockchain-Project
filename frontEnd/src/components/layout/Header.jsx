// src/components/Header.js
import logo from "../../assets/AllowFlow.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RegisterProvider } from "../../ethereum";

const Header = ({ reap, mt, cw }) => {
  const handleRegisterProvider = async () => {
    try {
      // Call the registerProvider function with the user's wallet address
      const result = await RegisterProvider(localStorage.getItem("address"));
      console.log(result);
    } catch (error) {
      console.error("Error registering provider:", error);
    }
  };

  return (
    <header className="bg-blue-50 bg-opacity-0 p-10 flex items-center justify-between w-full z-50">
      {/* Left side - Logo */}
      <div>
        <img src={logo} alt="Logo" className="w-auro h-5" />
      </div>

      <div className="flex gap-4">
        {mt && (
          <a href="/transaction" className="text-white mt-2">
            Make Transaction
          </a>
        )}
        {reap && (
          <button
            onClick={handleRegisterProvider}
            className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Register as a Provider
          </button>
        )}
        {cw && <ConnectButton showBalance={false} />}
      </div>
    </header>
  );
};

export default Header;
