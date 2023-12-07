import "./manager.css";

const ExecutePropopsal = ({ state, account }) => {
  async function proposalExecution(event) {
    try {
      event.preventDefault();
      const { contract } = state;

      const proposalID = document.querySelector("#id").value;

      await contract.methods
        .executeProposal(proposalID)
        .send({ from: account, gas: 480000 });
      alert("proposal executed sucesfully");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <form onSubmit={proposalExecution}>
        <label className="label1" htmlFor="proposalId">
          <span className="font">Proposal Id:</span>
        </label>
        <input type="text" id="id"></input>
        <button className="button" type="submit">
          Execute
        </button>
      </form>
    </>
  );
};

export default ExecutePropopsal;
