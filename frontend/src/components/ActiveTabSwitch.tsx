import { useChatStore } from "../store/useChatStore";

type Tab = "chats" | "contacts";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore() as {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
  };

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2 gap-1">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats"
            ? "bg-[rgba(0,0,0,0.25)] text-[rgb(21,39,67)] rounded-2xl"
            : "text-[rgb(32,61,104)] hover:bg-[rgba(0,0,0,0.1)] rounded-2xl"
        }`}
      >
        Your chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts"
            ? "bg-[rgba(0,0,0,0.25)] text-[rgb(21,39,67)] rounded-2xl"
            : "text-[rgb(32,61,104)] hover:bg-[rgba(0,0,0,0.1)] rounded-2xl"
        }`}
      >
        People
      </button>
    </div>
  );
}

export default ActiveTabSwitch;