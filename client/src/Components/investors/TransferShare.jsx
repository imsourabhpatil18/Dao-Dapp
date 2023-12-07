import "./investors.css";

const TransferShares = ({ state, account }) => {
  async function shareTransfer(event) {
    try {
      event.preventDefault();
      const { contract } = state;

      const weiValue = document.querySelector("#amount").value;
      const address = document.querySelector("#to").value;

      await contract.methods
        .transferShares(weiValue, address)
        .send({ from: account, gas: 480000 });
      alert("shareTransfer succesfull");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <form onSubmit={shareTransfer}>
        <label className="label1" htmlFor="amount">
          <span className="font">Amount:</span>
        </label>
        <input type="text" id="amount"></input>
        <label className="label1" htmlFor="to">
          <span className="font">Address:</span>
        </label>
        <input type="text" id="to"></input>

        <button className="button" type="submit">
          Transfer Share
        </button>
      </form>
    </>
  );
};

export default TransferShares;
