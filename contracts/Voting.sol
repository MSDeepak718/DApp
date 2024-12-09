// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(bytes32 => bool) public registeredVoters;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;
    uint public totalVotes;

    event VoterRegistered(bytes32 indexed voterHash);
    event VotedEvent(uint indexed candidateId);

    constructor() {
        addCandidate("Deepak");
        addCandidate("Bhuvi");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function registerVoter(string memory voterId) public {
        bytes32 voterHash = keccak256(abi.encodePacked(voterId));
        require(!registeredVoters[voterHash], "Voter already registered.");
        registeredVoters[voterHash] = true;
        emit VoterRegistered(voterHash);
    }

    function vote(string memory voterId, uint candidateId) public {
        bytes32 voterHash = keccak256(abi.encodePacked(voterId));
        require(registeredVoters[voterHash], "Voter not registered.");
        require(!hasVoted[msg.sender], "You have already voted.");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate.");

        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;
        totalVotes++;

        emit VotedEvent(candidateId);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory candidateList = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            candidateList[i - 1] = candidates[i];
        }
        return candidateList;
    }
}
