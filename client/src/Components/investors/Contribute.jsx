import "./investors.css";

const Contribution = ({ state, account }) => {
  async function contributeFunds(event) {
    try {
      event.preventDefault();
      const { contract } = state;
      const weiValue = document.querySelector("#weiValue").value;

      await contract.methods
        .contribution()
        .send({ from: account, gas: 480000, value: weiValue });
    } catch (error) {
      alert(error);
    }
    window.location.reload();
    console.log("contribution function working");
  }

  return (
    <>
      <form onSubmit={contributeFunds}>
        <label className="label1" htmlFor="weiValue">
          <span className="font">Contribution Amount: </span>
        </label>
        <input type="text" id="weiValue"></input>
        <button type="submit" className="button">
          Contribute
        </button>
      </form>
    </>
  );
};

export default Contribution;
