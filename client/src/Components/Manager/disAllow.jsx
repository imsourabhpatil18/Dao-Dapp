const DisAllow = () => {
  async function disallow(event) {
    try {
      event.preventDefault();
      const { contract } = state;

      const id = document.querySelector("#id").value;

      await contract.methods.disallow(id).send({ from: account, gas: 480000 });
      alert("disallow id set");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <form onSubmit={disallow}>
        <label className="label1" htmlFor="id">
          <span className="font">Address:</span>
        </label>
        <input type="text" id="id"></input>
        <button className="button" type="submit">
          disAllow
        </button>
      </form>
    </>
  );
};

export default DisAllow;
