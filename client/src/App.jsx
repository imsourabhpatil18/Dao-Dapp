import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import Dao from "../Contracts/Dao.json";
import Investors from "./Components/investors/investors";
import Manager from "./Components/Manager/Manager";
import Navbar from "./Components/Navbar";
import "./app.css";
import Home from "./Components/Home";

function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [account, setAccount] = useState(null);
  const [buttonText, setButtonText] = useState("connect Wallet");

  useEffect(() => {
    async function init() {
      const contractABI = Dao.abi;

      let provider = new Web3.providers.HttpProvider(
        "https://eth-sepolia.g.alchemy.com/v2/_EemJldI7Q2EbIcwTPXcuKVT_X_UaS5r"
      );

      let web3 = new Web3(provider);

      const contract = new web3.eth.Contract(
        contractABI,
        "0xECe2337A6e2771690ce291b78FF0e7080C1caF62"
      );

      setState({ web3: web3, contract: contract });
    }
    init();
  }, []);

  async function connectWallet() {
    const { contract } = state;
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      //when metamask is installed
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account[0]);
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
    <Router>
      <>
        <Navbar />

        <div className="wallet-connect-container">
          <h3>Account Address: {account}</h3>
          <button onClick={connectWallet}>{buttonText}</button>
        </div>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home state={state} />} />
            <Route
              path="/manager"
              element={<Manager state={state} account={account} />}
            />
            <Route
              path="/investors"
              element={<Investors state={state} account={account} />}
            />
          </Routes>
        </div>
      </>
    </Router>
  );
}
export default App;
