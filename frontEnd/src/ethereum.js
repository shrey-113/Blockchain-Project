import Web3 from "web3";
import MainABI from "./contracts/MainContract.json";
import ProivderABI from "./contracts/ProviderContract.json";

const web3 = new Web3(window.ethereum);

const mainAddress = "0x96AE375cF5010198403b32CaBDA4CE6B6E80Ddd9";

const mainContract = new web3.eth.Contract(MainABI, mainAddress);

const RegisterProvider = async (providerWalletAddress) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await mainContract.methods
      .RegisterProvider(providerWalletAddress)
      .send({ from: accounts[0] });

    return result;
  } catch (error) {
    console.error("Error registering provider:", error);
    throw error;
  }
};

const RegisterAllowance = async ({
  walletAddress,
  amount,
  startDate,
  endDate,
  rName,
}) => {
  try {
    // Parse amount to a floating-point number
    const amountWei = web3.utils.toWei(amount.toString(), "ether");

    // Parse startDate and endDate to JavaScript Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Convert startDate and endDate to Unix timestamps (in seconds)
    const startDateUnixTimestamp = Math.floor(parsedStartDate.getTime() / 1000);
    const endDateUnixTimestamp = Math.floor(parsedEndDate.getTime() / 1000);

    // Get the provider address from localStorage
    const providerAddress = localStorage.getItem("address");

    // Get the user's Ethereum accounts using Web3
    const accounts = await web3.eth.getAccounts();

    // Call RegisterAllowance function with parsed values
    const result = await mainContract.methods
      .RegisterAllowance(
        providerAddress,
        walletAddress,
        amountWei,
        startDateUnixTimestamp,
        endDateUnixTimestamp,
        rName
      )
      .send({ from: accounts[0], value: amountWei });

    return result;
  } catch (error) {
    console.error("Error registering allowance:", error);
    throw error;
  }
};

const Transact = async (recipientAddress, amount, behalfAddress) => {
  try {
    const accounts = await web3.eth.getAccounts();

    const amountWei = web3.utils.toWei(amount.toString(), "ether");

    // Get the contract addresses using the behalfAddress
    const providerContractAddress = await mainContract.methods
      .getProviderContractAddressForReciever(behalfAddress)
      .call();

    const providerContractInstance = new web3.eth.Contract(
      ProivderABI,
      providerContractAddress
    );

    console.log(recipientAddress, amountWei, behalfAddress);

    // // Call the Transact function of the AllowanceContract
    // await mainContract.methods
    //   .Transact(recipientAddress, amountWei, behalfAddress)
    //   .send({ from: accounts[0] });

    // Call the Transact function of the ProviderContract to make the payment
    const res = await providerContractInstance.methods
      .Transact(recipientAddress, amountWei, behalfAddress)
      .send({
        from: accounts[0],
        value: amountWei,
      });

    console.log(res);

    return true;
  } catch (error) {
    console.error("Error transacting:", error);
    throw error;
  }
};

const getProviderData = async (providerWalletAddress) => {
  try {
    const accounts = await web3.eth.getAccounts();

    const result = await mainContract.methods
      .getProviderData(providerWalletAddress)
      .call();

    return result;
  } catch (error) {
    console.error("Error registering provider:", error);
    throw error;
  }
};

const getProviderContractAddress = async (providerAddress) => {
  try {
    const result = await mainContract.methods
      .getProviderContractAddress(providerAddress)
      .call();

    return result;
  } catch (error) {
    console.error("Error getting provider contract address:", error);
    throw error;
  }
};

const getProviderContractAddressForReceiver = async (receiverAddress) => {
  try {
    const result = await mainContract.methods
      .getProviderContractAddressForReceiver(receiverAddress)
      .call();

    return result;
  } catch (error) {
    console.error(
      "Error getting provider contract address for receiver:",
      error
    );
    throw error;
  }
};

export {
  RegisterProvider,
  getProviderData,
  RegisterAllowance,
  Transact,
  getProviderContractAddress,
  getProviderContractAddressForReceiver,
};
