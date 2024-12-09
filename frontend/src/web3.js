import Web3 from "web3";
import Voting from "./abis/Voting.json";

const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum === "undefined") {
            reject(new Error("MetaMask or a compatible wallet is required."));
            return;
        }

        window.ethereum.request({ method: "eth_requestAccounts" })
            .then(() => {
                const web3 = new Web3(window.ethereum);
                resolve(web3);
            })
            .catch((error) => reject(error));
    });
};

const getContract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    console.log("Network ID:", networkId);

    const deployedNetwork = Voting.networks[networkId];
    console.log("Deployed Network:", deployedNetwork);

    if (!deployedNetwork) {
        throw new Error(`Contract not deployed on network with ID ${networkId}`);
    }

    const contract = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork.address
    );
    console.log("Contract"+contract.address);
    console.log("Contract Address:", deployedNetwork.address);

    return contract;
};

export { getWeb3, getContract };
