import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";
import send from "./../icons/paper-plane-solid.30ff3fdc30a26072efeb7f2bf8bd3590.svg";

function CustomInput() {
  const { handleSubmit } = useMessageInputContext();
  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="str-chat__input-flat--textarea-wrapper">
            <ChatAutoComplete />
          </div>
          <button type="submit">
            <img src={send} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomInput;
