import "./investors.css";
const CreateProposal = ({ state, account }) => {
  async function proposalCreation(e) {
    e.preventDefault();
    const { contract } = state;

    const description = document.getElementById("description").value;
    const amountWant = document.getElementById("amountWant").value;
    const receipientAddress = document.getElementById("recipient").value;

    try {
      await contract.methods
        .createProposal(description, amountWant, receipientAddress)
        .send({ from: account, gas: 1000000 });
      alert("proposal created succesfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={proposalCreation}>
        <label className="label1" htmlFor="description">
          <span className="font">Description:</span>
        </label>
        <input type="text" id="description"></input>
        <label className="label1" htmlFor="amountWant">
          <span className="font"> Amount Neeed(in Wei):</span>
        </label>
        <input type="text" id="amountWant"></input>
        <label className="label1" htmlFor="recipient">
          <span className="font">Recipient Address:</span>
        </label>
        <input type="text" id="recipient"></input>
        <button className="button" type="submit">
          Create Proposal
        </button>
      </form>
    </>
  );
};

export default CreateProposal;
