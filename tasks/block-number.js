const {task} = require("hardhat/config")

task("block-number", "prints the current block number").setAction(
    // to działa jak async funkcjią name 
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)

    }
)

// module który exportuje całą funkcje 
module.exports = {}

// domyślnie hardhat testuje na swoim lockalnym sieci i liczba bloków jest 0 
// jeżeli testujemy rinkeby(yarn hardhat block-number --network rinkeby) to bedziemy testwać na rinkeby i liczba blocków bedzie 11113744