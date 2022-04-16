import React from "react";
import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Button from "../UI/Button";
import CustomInput from "./CustomInput";
import Game from "./Game";

function JoinGmae() {
  const [rivalName, setRivalName] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    if (rivalName === client.userID) {
      alert("this id not found");
      return;
    }
    const response = await client.queryUsers({ username: { $eq: rivalName } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });
    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      <p className="id_user">ID: {client.user.id}</p>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalName(event.target.value);
            }}
          />
          <Button onClick={createChannel}> Join/Start Game</Button>
        </div>
      )}
    </>
  );
}

export default JoinGmae;
