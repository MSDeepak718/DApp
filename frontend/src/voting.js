import React, { useEffect, useState } from "react";
import { getWeb3, getContract } from "./web3";
// import Voting from "./abis/Voting.json";

function VotingApp() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3Instance = await getWeb3();
      const accountsList = await web3Instance.eth.getAccounts();
      const contractInstance = await getContract(web3Instance);
      const candidatesList = await contractInstance.methods.getCandidates().call();

      setWeb3(web3Instance);
      setAccounts(accountsList);
      setContract(contractInstance);
      setCandidates(candidatesList);
    };

    init();
  }, []);

  const handleVote = async (candidateId) => {
    await contract.methods.vote(candidateId).send({ from: accounts[0] });
    alert("Vote casted!");
  };

  return (
    <div>
      <h1>Decentralized Voting App</h1>
      {candidates.map((candidate) => (
        <div key={candidate.id}>
          <h3>{candidate.name}</h3>
          <button onClick={() => handleVote(candidate.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default VotingApp;
