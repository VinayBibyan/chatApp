import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ProfileHeader from "../components/ProfileHeader";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  useEffect(() => {}, []);

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        <div className="w-full flex flex-col md:flex-row border backdrop-blur-xl rounded-3xl h-[83vh] max-h-[83vh]">
          {/* LEFT SIDE */}
          <div className="w-80 backdrop-blur-sm flex flex-col border-r">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col backdrop-blur-sm border-l">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
