import "./manager.css";

const Allow = () => {
  async function allow(event) {
    try {
      event.preventDefault();
      const { contract } = state;

      const id = document.querySelector("#id").value;

      await contract.methods.allow(id).send({ from: account, gas: 480000 });
      alert("allow id set");
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <form onSubmit={allow}>
        <label className="label1" htmlFor="id">
          <span className="font">Address:</span>
        </label>
        <input type="text" id="id"></input>
        <button className="button" type="submit">
          Allow
        </button>
      </form>
    </>
  );
};

export default Allow;
