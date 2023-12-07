import "./investors.css";

const ReedemShares = ({ state, account }) => {
  async function reedemFunds(event) {
    try {
      event.preventDefault();
      const { contract } = state;
      const weiValue = document.querySelector("#shares").value;

      await contract.methods
        .redeemShares(weiValue)
        .send({ from: account, gas: 480000 });
      alert("shares reedemed");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
    window.location.reload();
    console.log("reedem function working");
  }

  return (
    <>
      <form onSubmit={reedemFunds}>
        <label className="label1" htmlFor="shares">
          <span className="font">Number of Shares:</span>
        </label>
        <input type="text" id="shares"></input>

        <button className="button" type="submit">
          Reedem Share
        </button>
      </form>
      <br />
    </>
  );
};

export default ReedemShares;
