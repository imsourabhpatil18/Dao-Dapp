async function main() {
  try {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const _participationTimeEnd = 3600;
    const _voteTime = 3600;
    const _quorum = 51;

    const DaoFactory = await ethers.getContractFactory("Dao");

    const daoInstance = await DaoFactory.deploy(
      _participationTimeEnd,
      _voteTime,
      _quorum
    );

    console.log("Dao address:", await daoInstance.target);
  } catch (error) {
    console.error("Error during deployment:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
