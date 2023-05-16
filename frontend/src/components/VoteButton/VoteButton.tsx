"use client";
import { useState } from "react";

const VoteButton = () => {
  const [votes, setVotes] = useState(0);
  const [removeVoteButton, setRemoveVoteButton] = useState(false);

  const handleVoteUp = () => {
    // Make an API call to update the vote count on the server
    // You can use axios or fetch to make the request
    // Update the vote count in the component state
    setVotes(votes + 1);
  };

  const removeVote = () => {
    setRemoveVoteButton(true);
  };

  const votesTotal = async () => {
    let response = await fetch(`/api/tracks/${t["title"]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes }),
    });
    let data = await response.json();
    console.log(data);
  };

  if (removeVoteButton === false) {
    return (
      <div>
        <button
          onClick={() => {
            votesTotal();
            handleVoteUp();
            removeVote();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Vote track up!
        </button>
        <span className="ml-2">{votes}</span>
      </div>
    );
  } else {
    return (
      <div>
        <p>youve voted</p>
        <span className="ml-2">{votes}</span>
      </div>
    );
  }
};

export default VoteButton;
