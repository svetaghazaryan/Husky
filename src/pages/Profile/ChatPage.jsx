import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../../services/api";
import MainLayout from "../../layout/MainLayout";

function ChatPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [showUserList, setShowUserList] = useState(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        const filteredUsers = res.data.filter((u) => Number(u.id) !== Number(user.id));
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };
    fetchUsers();
  }, [user.id]);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get("/messages");
        const convo = res.data.filter(
          (msg) =>
            (Number(msg.senderId) === Number(user.id) && Number(msg.receiverId) === Number(selectedUser.id)) ||
            (Number(msg.senderId) === Number(selectedUser.id) && Number(msg.receiverId) === Number(user.id))
        );
        setMessages(convo);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };
    fetchMessages();
  }, [selectedUser, user.id]);

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;

    try {
      const message = {
        senderId: user.id,
        receiverId: selectedUser.id,
        message: text,
      };
      const res = await api.post("/messages", message);
      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Sending failed:", err);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowUserList(false); 
  };

  const handleBackToUsers = () => {
    setShowUserList(true);
  };

  return (
    <MainLayout>
      <div className="flex h-[80vh] bg-white m-2 md:m-8 rounded-2xl shadow-md overflow-hidden">
        <div className={`${showUserList ? 'flex' : 'hidden'} md:flex w-full md:w-1/3 border-r p-4 md:p-6 flex-col`}>
          <div className="flex items-center gap-2 mb-4">
            {!showUserList && (
              <button 
                onClick={handleBackToUsers}
                className="md:hidden text-2xl mr-2"
              >
                ←
              </button>
            )}
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-xl mb-4 text-sm md:text-base"
          />
          <div className="overflow-y-auto flex-1 space-y-2 pr-2">
            {users
              .filter((u) =>
                `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())
              )
              .map((u) => (
                <div
                  key={u.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${
                    selectedUser?.id === u.id ? "bg-purple-100" : ""
                  }`}
                  onClick={() => handleSelectUser(u)}
                >
                  <img
                    src="/logo192.png"
                    alt={`${u.firstName} ${u.lastName}`}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm md:text-base">
                      {u.firstName} {u.lastName}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 truncate max-w-[120px] md:max-w-[180px]">
                      {u.email}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={`${!showUserList ? 'flex' : 'hidden'} md:flex w-full md:w-2/3 flex-col`}>
          {selectedUser ? (
            <>
              <div className="border-b p-3 md:p-4 flex items-center gap-3 md:gap-4">
                <button 
                  onClick={handleBackToUsers}
                  className="md:hidden text-xl mr-1"
                >
                  ←
                </button>
                <img 
                  src="/logo192.png" 
                  alt="" 
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover" 
                />
                <div>
                  <div className="font-bold text-base md:text-lg">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {selectedUser.email}
                  </div>
                </div>
              </div>

              <div className="flex-1 p-3 md:p-6 space-y-3 md:space-y-4 overflow-y-auto bg-white">
                {messages.map((msg) => {
                  const isSender = Number(msg.senderId) === Number(user.id);
                  return (
                    <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                      <div className="flex items-end gap-1 md:gap-2 max-w-[85%] md:max-w-[70%]">
                        {!isSender && (
                          <img src="/logo192.png" alt="" className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                        )}
                        <div
                          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-2xl text-xs md:text-sm shadow-md ${
                            isSender
                              ? "bg-purple-500 text-white rounded-br-none"
                              : "bg-gray-100 text-black rounded-bl-none"
                          }`}
                        >
                          {msg.message}
                        </div>
                        {isSender && (
                          <img src="/logo192.png" alt="" className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t p-3 md:p-4 pb-1 md:pb-2 flex items-center gap-2 md:gap-4">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Type something..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-purple-500 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-purple-600 transition text-sm md:text-base"
                >
                  SEND
                </button>
              </div>
              <Link to='/profile' className="text-purple-500 px-4 md:px-6 pb-2 underline text-xs md:text-sm">
                Show my account details
              </Link>
            </>
          ) : (
            <div className="p-6 text-gray-400 text-lg hidden md:block">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default ChatPage;