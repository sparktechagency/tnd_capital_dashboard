import useUserData from "../../hooks/useUserData";
import { useAppSelector } from "../../redux/hooks";
import ConversationChatList from "../../Components/Conversation/ConversationChatList";
import ConversationMessage from "../../Components/Conversation/ConversationMessage";

const ConversationPage = () => {
  const userData = useUserData();
  const onlineUsers = useAppSelector((state) => state.conversation.onlineUser);

  return (
    <div className="">
      <div className="flex h-[91vh] relative overflow-hidden">
        <ConversationChatList userData={userData} onlineUsers={onlineUsers} />

        <ConversationMessage userData={userData} onlineUsers={onlineUsers} />
      </div>
    </div>
  );
};

export default ConversationPage;
