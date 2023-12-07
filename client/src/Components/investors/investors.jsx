import Contribution from "./Contribute";
import ReedemShares from "./ReedemShare";
import TransferShares from "./TransferShare";
import CreateProposal from "./CreateProposal";
import InvestorList from "./InvestorList";
import VoteProposal from "./VoteProposal";
import WithdrawEther from "./withdrawAll";
import "./investors.css";

const Investors = ({ state, account }) => {
  return (
    <>
      <div className="centered-components">
        <Contribution state={state} account={account} />
        <ReedemShares state={state} account={account} />
        <TransferShares state={state} account={account} />
        <CreateProposal state={state} account={account} />
        <VoteProposal state={state} account={account} />
        <WithdrawEther state={state} account={account} />
        <InvestorList state={state} />
      </div>
    </>
  );
};

export default Investors;
