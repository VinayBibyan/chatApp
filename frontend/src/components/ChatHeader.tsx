import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center  max-h-[84px] px-6 flex-1 bg-[rgba(0,0,0,0.25)] rounded-tr-3xl"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "avatar-online" : "avatar"}`}>
          <div className="w-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div>
          <h3 className="text-[rgb(21,39,67)] font-medium">{selectedUser.fullName}</h3>
          <p className="text-[rgb(32,61,104)] text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-[rgb(21,39,67)] hover:text-[rgb(32,61,104)] transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
export default ChatHeader;