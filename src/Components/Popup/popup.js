import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Button from "../../UI/Button";
import "./Popup.css";
function Modal(props) {
  const { client } = useChatContext();
  const { channel } = useChannelStateContext();
  const HidePopup = async () => {
    await props.channel.stopWatching();
    props.setChannel(null);
    props.channel.sendEvent({
      type: "leave",
    });
  };
  //   const RestartGame = async () => {
  //     await channel.stopWatching();
  //     props.setChannel(null);
  //     const PartnerId = channel._data.members.find((id) => id !== client.userID);
  //     const newChannel = await client.channel("messaging", {
  //       members: [client.userID, PartnerId],
  //     });
  //     await newChannel.watch();
  //     console.log(newChannel);
  //     props.setChannel(newChannel);
  //   };
  return (
    <>
      <div className="modal">
        <div className="Hide" onClick={HidePopup}></div>
        <div className="modal__content">
          <p className="result">{props.winner} Won The Game</p>
          <Button onClick={HidePopup}>Leave The Game</Button>
          {/* <Button onClick={RestartGame}>Rejouer</Button> */}
        </div>
      </div>
    </>
  );
}
export default Modal;
