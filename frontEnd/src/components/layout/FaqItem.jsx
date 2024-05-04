import { useState } from "react";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <div className="flex items-center justify-between bg-[#0a151d] p-3 rounded transition duration-3000 ease-in-out">
          <div className="text-left">{question}</div>
          <div
            className={`transform ${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-transform duration-500 ease-in-out`}
          >
            &#9660;
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#132736] p-3 rounded mt-2">{answer}</div>
      </div>
    </div>
  );
};

export default FaqItem;
