import Allow from "./Allow";
import ExecuteProposal from "./ExecuteProposal";
import DisAllow from "./disAllow";

const Manager = ({ state, account }) => {
  return (
    <>
      <div className="centered-components">
        <ExecuteProposal state={state} account={account} />
        <Allow state={state} account={account} />
        <DisAllow state={state} account={account} />
      </div>
    </>
  );
};
export default Manager;
