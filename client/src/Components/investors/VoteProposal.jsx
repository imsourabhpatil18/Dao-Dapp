import "./investors.css";

const VoteProposal = ({ state, account }) => {
  async function voting(event) {
    try {
      event.preventDefault();
      const { contract } = state;

      const voterId = document.querySelector("#voteId");

      await contract.methods
        .voteProposal(voterId)
        .send({ from: account, gas: 1000000 });
      alert("voting succesful");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <form onSubmit={voting}>
        <label className="label1" htmlFor="voteId">
          <span className="font">Proposal Id:</span>
        </label>
        <input type="text" id="voteId"></input>
        <button className="button" type="submit">
          Vote
        </button>
      </form>
    </>
  );
};

export default VoteProposal;
