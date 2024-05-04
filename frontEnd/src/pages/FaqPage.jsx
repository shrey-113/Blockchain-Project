import FaqItem from "../components/layout/FaqItem";
import Footer from "../components/layout/Footer";

const FaqPage = () => {
  return (
    <>
      <div className=" w-screen min-h-screen bg-[#02040F]">
        <div className="max-w-2xl mx-auto mt-40 mb-48 text-[#FFFFFF]">
          <h1 className="text-4xl font-bold mb-8">
            Frequently Asked Questions
          </h1>

          <FaqItem
            question="What is AllowFlow?"
            answer="AllowFlow is a decentralized allowance system that enables seamless fund allocation from a parent wallet to child wallets, fostering controlled and secure financial transactions."
          />
          <FaqItem
            question="How does AllowFlow work"
            answer="AllowFlow allows a parent wallet to allocate specific amounts to child wallets, providing a transparent and secure way to manage allowances within a decentralized environment."
          />
          <FaqItem
            question="What are the key features of AllowFlow?"
            answer="AllowFlow offers customizable allowance levels, transaction tracking, and a user-friendly interface for efficient fund management between parent and child wallets."
          />
          <FaqItem
            question="Can I set spending limits for child wallets?"
            answer="Yes, AllowFlow introduces three allowance levels—Low, Medium, and High—each with a specific fund cap, providing flexibility to tailor allowances based on individual needs."
          />
          <FaqItem
            question="Is AllowFlow suitable for businesses?"
            answer="Absolutely, AllowFlow is versatile and can be employed in various scenarios, including employer-employee relations, facilitating seamless fund transfers for specific purposes."
          />
          <FaqItem
            question="How secure is AllowFlow?"
            answer="AllowFlow leverages blockchain technology, ensuring transparency and security in transactions. Smart contract protocols add an extra layer of trust to the system."
          />
          <FaqItem
            question="What happens if a child wallet exceeds the allowance limit?"
            answer="AllowFlow prevents overspending by automatically restricting transactions when the allocated allowance is exhausted, encouraging responsible financial behavior."
          />
          <FaqItem
            question="Are transactions reversible?"
            answer="No, once a transaction is executed on AllowFlow, it is immutable. Users are encouraged to double-check transaction details before confirming."
          />
          <FaqItem
            question="Can I integrate AllowFlow with other applications?"
            answer="AllowFlow is designed to be flexible and can potentially integrate with other applications through its open architecture, making it a versatile solution."
          />
          <FaqItem
            question="What's the future scope of AllowFlow?"
            answer="AllowFlow envisions broader applications, including automated trading bots, educational allowances, and enhanced parent-child financial relations in the evolving digital landscape."
          />
          {/* Add more FAQ items as needed */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FaqPage;
