import "./investors.css";

const WithdrawEther = ({ state, account }) => {
  async function Withdraw(event) {
    try {
      event.preventDefault();
      const { contract } = state;

      await contract.methods
        .withdrawAllEther()
        .send({ from: account, gas: 1000000 });
      alert("withdrawal succesful");
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <button className="button" onSubmit={Withdraw}>
        WithdrawEther
      </button>
    </>
  );
};

export default WithdrawEther;
