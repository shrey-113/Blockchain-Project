import { useState } from "react";
import { Button } from "@mui/material";
import Header from "../components/layout/Header";
import Web3 from "web3";
import { Transact } from "../ethereum";

function TransactionPage() {
  const [addressInput, setAddressInput] = useState();
  const [amount, setAmount] = useState();
  const web3 = new Web3(window.ethereum);

  const handleSubmit = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      Transact(addressInput, amount, accounts[0]);
    } catch (error) {
      console.error("Error submitting for recipients:", error);
    }
  };

  return (
    <>
      <Header reap={false} mt={false} cw={true} />
      <div
        style={{
          width: "73.0625rem",
          backgroundColor: "#0C0E1A",
          borderRadius: "1rem",
          margin: "2rem auto",
          padding: "3rem",
        }}
      >
        <h1 className="text-white text-4xl mb-8">Make Transaction</h1>
        <div>
          <div className="mb-4 col-span-6">
            <label className="block ml-3 text-white text-sm font-bold mb-2">
              Send To
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              name="Send TO"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="mb-4 col-span-">
            <label className="block ml-3 text-white text-sm font-bold mb-2">
              Amount
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              name="Send TO"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=""
            />
          </div>
        </div>
        <Button className="mt-4" onClick={handleSubmit}>
          Make Payment
        </Button>
      </div>
    </>
  );
}
export default TransactionPage;
