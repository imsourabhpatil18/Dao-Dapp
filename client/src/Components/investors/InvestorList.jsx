import { useEffect, useState } from "react";
import "./investors.css";

const InvestorList = ({ state }) => {
  const [ilist, setIlist] = useState([]);
  useEffect(() => {
    const { contract } = state;
    async function allInvestors() {
      const investor = await contract.methods.investorList().call();
      setIlist(investor);
    }
    contract && allInvestors();
  }, [state]);

  return (
    <>
      <div className="list">
        <table>
          <tbody>
            <h3>investors List :</h3>
            {ilist.map((investorAddress) => {
              return <tr key={investorAddress}>{investorAddress}</tr>;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvestorList;
