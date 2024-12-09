import React, { useEffect, useState } from "react";
import { getWeb3, getContract } from "./web3";
import './App.css';

function VotingApp() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [voterName, setVoterName] = useState("");
  const [voterId, setVoterId] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

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

  const registerVoter = async () => {
    try {
      await contract.methods.registerVoter(voterId).send({ from: accounts[0] });
      setIsRegistered(true);
      alert("Registration successful!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleVote = async (candidateId) => {
    if (!isRegistered) {
      alert("You must register before voting.");
      return;
    }
    try {
      await contract.methods.vote(voterId, candidateId).send({ from: accounts[0] });
      alert("Vote casted!");
      window.location.reload();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="top">Decentralized Voting Application</h1>
      {!isRegistered ? (
        <div className="registration-container">
          <h2 className='heading'>Register to Vote</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Enter your voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            className="input"
          />
          <button onClick={registerVoter} className="register-button">
            Register
          </button>
        </div>
      ) : (
        <div className="voting-container">
          <h2 className='heading'>Vote for your favourite candidate</h2>
          <div className="table-container">
            <div className="table-header">
              <span>S.No.</span>
              <span>Name</span>
              <span>Vote Count</span>
              <span>Vote</span>
            </div>
            <div className="scrollable-list">
              {candidates.map((candidate, index) => (
                <div key={index} className="list-item">
                  <span className="can">{index + 1}</span>
                  <span className="can">{candidate.name}</span>
                  <span className="can">{parseInt(candidate.voteCount, 10)}</span>
                  <span>
                    <button
                      onClick={() => handleVote(candidate.id)}
                      className="vote"
                    >
                      Vote
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VotingApp;
