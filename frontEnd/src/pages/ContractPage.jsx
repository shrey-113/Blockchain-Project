import { useState, useEffect } from "react";
import CustomDialog from "../components/CustomDialog";
import ContractStatus from "../components/ContractStatus";
import { getProviderData, getProviderContractAddress } from "../ethereum";
import Header from "../components/layout/Header";
import Web3 from "web3";

function ContractPage() {
  const web3 = new Web3(window.ethereum);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [providerState, setProviderState] = useState("notProvider");
  const [providerData, setProvderData] = useState({});
  const [accountBalance, setAccountBalance] = useState(0);
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [totalBenefactors, setTotalBenefactors] = useState(0);

  web3.eth
    .getAccounts()
    .then((accounts) => {
      // Assuming you want to get the balance of the first account
      const account = accounts[0];

      // Get the balance of the account (in Wei)
      return web3.eth.getBalance(account);
    })
    .then((balance) => {
      // Convert balance from Wei to Ether
      const balanceInEther = web3.utils.fromWei(balance, "ether");
      setAccountBalance(balanceInEther);
      console.log("Account balance:", balanceInEther, "ETH");
    })
    .catch((error) => {
      console.error("Error fetching account balance:", error);
    });

  useEffect(() => {
    // Call getProviderData function when the component mounts
    const fetchData = async () => {
      try {
        const contractAddress = await getProviderContractAddress(
          localStorage.getItem("address")
        );
        console.log("contract add", contractAddress);
        if (contractAddress === "0x0000000000000000000000000000000000000000") {
          setProviderState("notProvider");
        } else {
          setProviderState("noAllowance");
        }

        const data = await getProviderData(localStorage.getItem("address"));
        console.log(data);
        if (data.allowances.length !== 0) {
          setProviderState("Allowances");
          setProvderData(data);
        }

        let totAL = 0n;

        // Iterate over each allowance object
        data.allowances.forEach((allowance) => {
          // Add allowanceSpent to totalAllowanceSpent
          totAL += allowance.allowanceAmount;
        });

        const allowanceSpentInEth = web3.utils.fromWei(
          totAL.toString(),
          "ether"
        );

        setTotalAllowance(allowanceSpentInEth);

        setTotalBenefactors(data.benefactors.length);

        const x = new Date(
          Number(data.allowances[0].startdate) * 1000
        ).toString();
        console.log("totAL", x);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    fetchData();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Header reap={true} mt={true} cw={true} />

      <div>
        {providerState === "notProvider" && (
          <div className="mt-[10rem] mb-[17rem]">
            <h1 className="text-5xl text-white text-center">
              Please Register as Provider First!
            </h1>
          </div>
        )}

        {providerState === "noAllowance" && (
          <>
            <div className="mt-[10rem] mb-[12rem]">
              <h1 className="text-5xl text-white text-center">
                No Allowance Sanctioned
              </h1>
              <div className="flex gap-2 justify-center mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  onClick={openDialog}
                >
                  Add An Allowance
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-3xl  text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Learn More
                </button>
              </div>
            </div>
          </>
        )}

        {providerState === "Allowances" && (
          <>
            <div className="container flex justify-evenly mx-auto mt-10">
              <div className="flex gap-2">
                <h1 className="text-white">Account Balance: </h1>
                <p className="text-white">{accountBalance}</p>
              </div>
              <div className="flex gap-2">
                <h1 className="text-white">Total Allowance Sanctioned: </h1>
                <p className="text-white">{totalAllowance}</p>
              </div>
              <div className="flex gap-2">
                <h1 className="text-white">Total Benefactors: </h1>
                <p className="text-white">{totalBenefactors}</p>
              </div>
            </div>

            <div className="mt-[4rem]">
              <button
                type="button"
                className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ml-44 "
                onClick={openDialog}
              >
                Add An Allowance
              </button>
              <div>
                {providerData.allowances.map((data, index) => (
                  <div key={index}>
                    <ContractStatus
                      createdAt={new Date(
                        Number(data.startdate) * 1000
                      ).toString()}
                      status="Running"
                      purpose={data.walletAddress}
                      name={data.name}
                      sanctionedAmount={web3.utils.fromWei(
                        data.allowanceAmount.toString(),
                        "ether"
                      )}
                      spentAmount={web3.utils.fromWei(
                        data.allowanceSpent.toString(),
                        "ether"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <CustomDialog open={isDialogOpen} handleClose={closeDialog} />
      </div>
    </>
  );
}

export default ContractPage;
