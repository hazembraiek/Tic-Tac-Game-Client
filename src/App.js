import Cookies from "universal-cookie";
import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { StreamChat } from "stream-chat";
import { useState } from "react";
import JoinGame from "./Components/JoinGame";
import { Chat, useChannelStateContext } from "stream-chat-react";
import Button from "./UI/Button";
function App() {
  const [channel, setChannel] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const cookies = new Cookies();
  const api_key = "2qh9udybds4t";
  const Token = cookies.get("Token");
  const client = StreamChat.getInstance(api_key);
  if (Token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          password: cookies.get("password"),
        },
        Token
      )
      .then((user) => setIsAuth(true));
  }
  console.log(channel);
  const logOut = async () => {
    cookies.remove("Token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("password");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
    await channel.stopWatching();
    setChannel(null);
    channel.sendEvent({
      type: "leave",
    });
  };
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame channel={setChannel} />
          <Button onClick={logOut} id="btnLogout">
            Logout
          </Button>
        </Chat>
      ) : isLogin ? (
        <Login Auth={setIsAuth} isLogin={setIsLogin} />
      ) : (
        <SignUp Auth={setIsAuth} isLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
