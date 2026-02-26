import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;

  return (
    <>
      {allContacts.map((contact: any) => (
        <div
          key={contact._id}
          className="bg-[rgba(0,0,0,0.1)] p-3 rounded-2xl cursor-pointer hover:bg-[rgba(0,0,0,0.25)] text-[rgb(32,61,104)] transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "avatar-online" : "avatar"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
              </div>
            </div>
            <h4 className="font-medium truncate text-[rgb(32,61,104)]">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;