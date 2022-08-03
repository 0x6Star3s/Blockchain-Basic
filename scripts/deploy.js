const {ethers, run, network} = require("hardhat");
require("dotenv").config()

async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("deploying contract....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  // console.log(simpleStorage)
  console.log(`contract address ${simpleStorage.address}`)
  if(network.config.chainId === 4  && process.env.ETHERSCAN_API_KEY){
    console.log("waiting for block confirmations..")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [] )
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`curent value is: ${currentValue}`)

  // Updata the current value

  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const upadtedValue = await simpleStorage.retrieve()
  console.log(`updata curent value is: ${upadtedValue}`)
}

async function verify(contractAddress, args){
  console.log("verifying contract...")
  try{
    await run("verify:verify",{
      address: contractAddress,
      contructorArguments: args,
    })
  }catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("already verified")
    }else{
      console.log(e)
    }

  }

}

main()
  .then(()=> process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })