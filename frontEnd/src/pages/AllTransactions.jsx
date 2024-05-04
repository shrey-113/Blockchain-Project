import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Header from "../components/layout/Header";
import Web3 from "web3";
import { Transact, getProviderData } from "../ethereum";

function AllTransactions() {
  const [addressInput, setAddressInput] = useState();
  const [amount, setAmount] = useState();
  const [providerData, setProvderData] = useState({});
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    // Call getProviderData function when the component mounts
    const fetchData = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const data = await getProviderData(accounts[0]);
        console.log(data);
        if (data.allowances.length !== 0) {
          setProvderData(data);
        }
        console.log("AAAAAAAAA", data.transactions);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };
    fetchData();
  }, []);

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
        <h1 className="text-white text-4xl mb-8">All Transactions</h1>

        <div>{providerData.transactions}</div>
      </div>
    </>
  );
}
export default AllTransactions;
