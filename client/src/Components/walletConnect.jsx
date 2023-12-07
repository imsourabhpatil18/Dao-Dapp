import "./walletConnect.css";
import { useState } from "react";

const WalletConnect = ({ state }) => {
  const [account, setAccount] = useState(null);
  const [buttonText, setButtonText] = useState("connect Wallet");

  async function connectWallet() {
    const { contract } = state;
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      //when metamask is installed
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account);
        setButtonText("connected");
      } catch (error) {
        console.log(error);
      }
    } else {
      //when metamask is not installed
      console.log("Install Metamask");
    }
  }
  return (
    <>
      <div className="wallet-connect-container">
        <h2>Metamask Login </h2>
        <h3>Account Address :{account}</h3>

        <button onClick={connectWallet}>{buttonText}</button>
      </div>
    </>
  );
};

export default WalletConnect;
