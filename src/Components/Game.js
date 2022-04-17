import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput, Message } from "stream-chat-react";
import spiner from "./../icons/spinner-solid.svg";
import "./Chat.css";
import Button from "../UI/Button";
import Modal from "./Popup/popup";
function Game({ channel, setChannel }) {
  const [Chat, setChat] = useState(false);
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  channel.on(async (event) => {
    if (event.type === "leave") {
      console.log("logout");
      window.location.reload();
    }
  });
  if (!playersJoined) {
    return (
      <div className="waiting">
        <p>Waiting for other player to join...</p>
        <img src={spiner} alt="" />
      </div>
    );
  }
  return (
    <div className="gameContainer">
      <div className={`Chat-Game ${Chat ? "display-chat" : ""}`}>
        <Board result={result} setResult={setResult} />
        <div
          className={`screenChat ${Chat ? "Show-screen" : ""}`}
          onClick={() => setChat(false)}
        ></div>
        <Window>
          <MessageList
            disableDateSeparator
            closeReactionSelectorOnClick
            hideDeletedMessages
            messageActions={["react"]}
          />
          <MessageInput noFiles />
        </Window>
        {result.state === "won" && (
          <Modal
            channel={channel}
            setChannel={setChannel}
            winner={result.winner}
          />
        )}
        {result.state === "tie" && (
          <Modal channel={channel} setChannel={setChannel} winner="" />
        )}
      </div>
      <Button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
          channel.sendEvent({
            type: "leave",
          });
        }}
        className="Chat-leave"
      >
        Leave Game
      </Button>
      <Button
        className={`Show-Chat ${Chat ? "Hide-btn" : ""}`}
        onClick={() => setChat(true)}
      >
        Chat
      </Button>
    </div>
  );
}

export default Game;
